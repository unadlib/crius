import { Step as BaseStep, Hooks, Props, Context, StepType } from 'crius';

export interface BaseContext<P = {}, C = {}> extends Hooks<P, C> {
  title?: string;
  params?: any;
}

export class Step<P = {}, C = {}> extends BaseStep<P, C & BaseContext<P, C>> {
  static title?: string;
  static params?: any;
  static context?: any;
  static test?(...args: any[]): void;
  static skip?(...args: any[]): void;
  static beforeEach?(...args: any[]): void;
  static afterEach?(...args: any[]): void;
  static plugins?: any[];
}
