import { run } from 'crius-runner';
import { Props, Context, StepType } from 'crius';
import { Step, BaseContext } from './step';

function autorun(test: Function): any {
  return function(target: typeof Step) {
    // TODO support callback(assert) for tape and ava: (t) => {}
    const baseContext: BaseContext = {
      title: target.title,
      params: target.params,
      async beforeHook(props, context, step) {
        target.beforeHook && await target.beforeHook(props, context, step);
        if (target.plugins) {
          for (const plugin of target.plugins) {
            plugin.beforeHook && await plugin.beforeHook(props, context, step);
          }
        }
      },
      async afterHook(props, context, step) {
        if (target.plugins) {
          // TODO think about `reverse` plugins?
          for (const plugin of target.plugins) {
            plugin.afterHook && await plugin.afterHook(props, context, step);
          }
        }
        target.afterHook && await target.afterHook(props, context, step);
      }
    }
    test(target.title, async () => {
      await run({
        key: target.name,
        props: { children: [] },
        step: target
      }, baseContext);
    });
  }
}

function title(title: string): any {
  if (typeof title === 'undefined' || title === null) {
    throw new Error('Test case title is required.');
  }
  return function(target: typeof Step) {
    target.title = title; 
  }
}
// TODO parser `TemplateStringsArray` to `object` and compatible with object or string parameters.
function examples(params: TemplateStringsArray) {
  return function(target: Object, name: string, descriptor: TypedPropertyDescriptor<any>) {
    (target as typeof Step).params = params;
    return descriptor;
  }
}

type HookCallback<P, C> = (props: Props<P, C>, context: Context<P, C>, step: StepType<P, C>) => void;

function beforeHook<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  return function(target: typeof Step) {
    target.afterHook = hookCallback;
  }
}

function afterHook<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  return function(target: typeof Step) {
    target.afterHook = hookCallback;
  }
}

type Plugins<P = {}, C = {}> = {
  beforeHook?: HookCallback<P, C>;
  afterHook?: HookCallback<P, C>;
}

function plugins<P = {}, C = {}>(plugins: Array<Plugins<P, C>>) {
  return function(target: typeof Step) {
    target.plugins = plugins;
  }
}

export {
  autorun,
  title,
  examples,
  beforeHook,
  afterHook,
  plugins
}
