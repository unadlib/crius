import { Step as BaseStep, Hooks, Props, Context, StepType } from 'crius';

export interface BaseContext<P = {}, C = {}> extends Hooks<P, C> {
  title?: string;
  params?: any;
}

// interface Plugin {
//   beforeHook?(...args: any[]): void;
//   afterHook?(...args: any[]): void;
// }

export class Step<P = {}, C = {}> extends BaseStep<P, C & BaseContext<P, C>> {
  static title?: string;
  static params?: any;
  static test?(...args: any[]): void;
  static skip?(...args: any[]): void;
  static beforeHook?(...args: any[]): void;
  static afterHook?(...args: any[]): void;
  static plugins?: any[];
}
