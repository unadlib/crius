import { Step as BaseStep, Hooks, Props, Context, StepType } from 'crius';
import { compileString } from './utils';

export interface BaseContext<P = {}, C = {}> extends Hooks<P, C> {
  title?: string;
  params?: object;
}

export class Step<P = {}, C = {}> extends BaseStep<P & { desc?: string }, C & BaseContext<P, C>> {
  static title?: string;
  static params?: object[];
  static context?: any;
  static test?(...args: any[]): void;
  static skip?(...args: any[]): void;
  static beforeEach?(...args: any[]): void;
  static afterEach?(...args: any[]): void;
  static plugins?: any[];

  constructor(props: P & { desc?: string }, context: C & BaseContext<P, C>) {
    super(props, context);
    if (
      typeof this.props.desc === 'string' &&
      typeof this.context.params === 'object'
    ) {
      Object.defineProperty(this.props, 'desc', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: compileString(this.props.desc, this.context.params)
      });
    }
  }

  // TODO ts ignore with non-react jsx
  render() { return null };
  setState() {};
  forceUpdate() {};
  state: any;
  refs: any;
  // TODO ts ignore with non-react jsx
}
