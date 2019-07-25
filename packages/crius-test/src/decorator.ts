import { run } from 'crius-runner';
import { Props, Context, StepType } from 'crius';
import { Step, BaseContext } from './step';

function autorun(test: Function): any {
  return function(target: typeof Step) {
    // TODO support callback(assert) for tape and ava: (t) => {}
    const baseContext: BaseContext = {
      title: target.title,
      params: target.params,
      async beforeEach(props, context, step) {
        target.beforeEach && await target.beforeEach(props, context, step);
        if (target.plugins) {
          for (const plugin of target.plugins) {
            plugin.beforeEach && await plugin.beforeEach(props, context, step);
          }
        }
      },
      async afterEach(props, context, step) {
        if (target.plugins) {
          for (const plugin of [...target.plugins].reverse()) {
            plugin.afterEach && await plugin.afterEach(props, context, step);
          }
        }
        target.afterEach && await target.afterEach(props, context, step);
      }
    }
    test(target.title, async () => {
      await run({
        key: target.name,
        props: { children: [] },
        step: target
      }, Object.assign(baseContext, target.context));
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

function beforeEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  return function(target: typeof Step) {
    target.beforeEach = hookCallback;
  }
}

function afterEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  return function(target: typeof Step) {
    target.afterEach = hookCallback;
  }
}

type Plugins<P = {}, C = {}> = {
  beforeEach?: HookCallback<P, C>;
  afterEach?: HookCallback<P, C>;
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
  beforeEach,
  afterEach,
  plugins
}
