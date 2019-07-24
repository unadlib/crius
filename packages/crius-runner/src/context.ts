
import { Context, Props, Step } from 'crius';

export function handleContext<P, C>(context: Context): Context {
  if (toString.call(context) !== '[object Object]') {
    (context as Context) = {};
  }
  if (typeof context._beforeHook !== 'function') {
    Object.defineProperties(context, {
      _beforeHook: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _beforeHook(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          if (typeof this.beforeHook === 'function') {
            await this.beforeHook(props, context, step);
          }
        }
      }
    })
  }
  if (typeof context._afterHook !== 'function') {
    Object.defineProperties(context, {
      _afterHook: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _afterHook(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          if (typeof this.afterHook === 'function') {
            await this.afterHook(props, context, step);
          }
        }
      },
    })
  }
  return context;
} 