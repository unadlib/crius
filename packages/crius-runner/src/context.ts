
import { Context } from 'crius';

export function handleContext(context: Context): Context {
  if (toString.call(context) !== '[object Object]') {
    (context as Context) = {
      async _beforeHook(props, context, step) {
        this.beforeHook && await this.beforeHook(props, context, step);
      },
      async _afterHook(props, context, step) {
        this.afterHook && await this.afterHook(props, context, step);
      },
    };
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