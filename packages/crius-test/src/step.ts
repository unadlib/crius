import { Step as BaseStep } from 'crius';

export interface BaseContext {
  title: string,
  params?: any
}

export class Step<P = {}, C = {}> extends BaseStep<P, C & BaseContext> {
  static title: string;
  static params?: any;
  static test?(...args: any[]): void;
  static skip?(...args: any[]): void;
}
