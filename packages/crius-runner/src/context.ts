
import { Context, Props, Step } from 'crius';

export function handleContext<P, C>(context: Context): Context {
  if (toString.call(context) !== '[object Object]') {
    (context as Context) = {};
  }
  if (typeof context._beforeEach !== 'function') {
    Object.defineProperties(context, {
      _beforeEach: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _beforeEach(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          if (typeof this.beforeEach === 'function') {
            await this.beforeEach(props, context, step);
          }
        }
      }
    })
  }
  if (typeof context._afterEach !== 'function') {
    Object.defineProperties(context, {
      _afterEach: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: async function _afterEach(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>) {
          if (typeof this.afterEach === 'function') {
            await this.afterEach(props, context, step);
          }
        }
      },
    })
  }
  return context;
} 