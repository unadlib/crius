import { run } from "crius-runner";
import { Props, Context, StepType } from "crius";
import { Step, BaseContext } from "./step";
import { parserString, compileString } from "./utils";

function autorun(_test: Function) {
  return function(_target: Object) {
    const target = _target as typeof Step;
    // TODO support callback(assert) for tape and ava: (t) => {}
    if (typeof target.params === "undefined" || target.params === null) {
      target.params = [{}];
    }
    const testParams =
      typeof target.handleParams === "function"
        ? target.handleParams(target.params)
        : target.params;
    for (const params of testParams) {
      const title = compileString(target.title || "", params);
      target.prototype.params = params;
      const baseContext: BaseContext = {
        title,
        params,
        async beforeEach(props, context, step) {
          if (typeof target.beforeEach === "function") {
            await target.beforeEach(props, context, step);
          }
          if (target.plugins) {
            for (const plugin of target.plugins) {
              if (typeof plugin.beforeEach === "function") {
                await plugin.beforeEach(props, context, step);
              }
            }
          }
        },
        async afterEach(props, context, step) {
          if (target.plugins) {
            for (const plugin of [...target.plugins].reverse()) {
              if (typeof plugin.afterEach === "function") {
                await plugin.afterEach(props, context, step);
              }
            }
          }
          if (typeof target.afterEach === "function") {
            await target.afterEach(props, context, step);
          }
        }
      };
      Object.defineProperties(
        baseContext,
        Object.getOwnPropertyDescriptors(target.context || {})
      );
      _test(title, async () => {
        await run(
          {
            key: target.name,
            props: { children: [] },
            step: target
          },
          baseContext
        );
      });
    }
  };
}

function title(title: string) {
  if (typeof title === "undefined" || title === null) {
    throw new Error("Test case title is required.");
  }
  return function(target: Object) {
    (target as typeof Step).title = title;
  };
}

function examples(params: TemplateStringsArray | object[] | string | string[]) {
  return function(
    target: Object,
    name: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    if (Array.isArray(params)) {
      if (typeof params[0] === "string") {
        (target.constructor as typeof Step).params = parserString(
          params[0] as string
        );
      } else if (toString.call(params[0]) === "[object Object]") {
        (target.constructor as typeof Step).params = params as object[];
      } else {
        throw new Error(
          '"@example" argument error, it must be an object or a string.'
        );
      }
    } else if (typeof params === "string") {
      (target.constructor as typeof Step).params = parserString(params);
    } else {
      throw new Error(
        '"@example" argument error, it must be an object or a string.'
      );
    }
    return descriptor;
  };
}

type HookCallback<P, C> = (
  props: Props<P, C>,
  context: Context<P, C>,
  step: StepType<P, C>
) => void;

function beforeEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  if (typeof hookCallback !== "function") {
    throw new Error('"@beforeEach" argument error, it must be a function.');
  }
  return function(target: typeof Step) {
    target.beforeEach = hookCallback;
  };
}

function afterEach<P = {}, C = {}>(hookCallback: HookCallback<P, C>) {
  if (typeof hookCallback !== "function") {
    throw new Error('"@afterEach" argument error, it must be a function.');
  }
  return function(target: typeof Step) {
    target.afterEach = hookCallback;
  };
}

export type Plugins<P = {}, C = {}> = {
  beforeEach?: HookCallback<P, C>;
  afterEach?: HookCallback<P, C>;
};

function plugins<P = {}, C = {}>(plugins: Array<Plugins<P, C>>) {
  return function(target: typeof Step) {
    target.plugins = plugins;
  };
}

function params(handleParams: (testParams: any[]) => any[]) {
  if (typeof handleParams !== "function") {
    throw new Error('"@params" argument error, it must be a function.');
  }
  return function(target: Object) {
    (target as typeof Step).handleParams = handleParams;
  };
}

export { autorun, title, examples, beforeEach, afterEach, plugins, params };
