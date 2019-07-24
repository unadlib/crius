
import { Context } from 'crius';

export function handleContext(context: Context): Context {
  if (toString.call(context) !== '[object Object]') {
    (context as Context) = {
      async _beforeHook() {
        this.beforeHook && await this.beforeHook();
      },
      async _afterHook() {
        this.afterHook && await this.afterHook();
      },
    };
  } else if (typeof context !== 'undefined') {
    if (!context._beforeHook) {
      context._beforeHook = async () => {
        context.beforeHook && await context.beforeHook();
      }
    }
    if (!context._afterHook) {
      context._afterHook = async () => {
        context.afterHook && await context.afterHook();
      }
    }
  }
  return context;
} 