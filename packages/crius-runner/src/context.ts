
import { Context, Props, Step } from 'crius';

export function handleContext<P, C>(context: Context): Context {
  if (toString.call(context) !== '[object Object]') {
    (context as Context) = {};
    Object.defineProperties(context, {
      _beforeHook: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _beforeHook(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          this.beforeHook && await this.beforeHook(props, context, step);
        }
      },
      _afterHook: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _afterHook(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          this.afterHook && await this.afterHook(props, context, step);
        }
      },
    })
  } else if (typeof context !== 'undefined') {
    if (!context._beforeHook) {
      context._beforeHook = async (props, context, step) => {
        context.beforeHook && await context.beforeHook(props, context, step);
      }
    }
    if (!context._afterHook) {
      context._afterHook = async (props, context, step) => {
        context.afterHook && await context.afterHook(props, context, step);
      }
    }
  }
  return context;
} 