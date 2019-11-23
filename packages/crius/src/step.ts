
import { CriusNode } from './flow';
import StepClass from './stepClass';
import { StepFunction } from './stepFunction';

export type OptionalKeyOf<T> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T], undefined>

export type ExcludeRequired<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]>
    ? never
    : T[K]
}

export type PickOptional<T> = Pick<ExcludeRequired<T>, OptionalKeyOf<T>>;

export type Step<P, C> = StepClass<P, C> | StepFunction<P, C>;

export type Key = string | undefined | null;

export type Children<P, C> = ReadonlyArray<(CriusNode<Step<P, C>, P, C> | ((props: Props<P, C>) => Promise<CriusNode<Step<P, C>, P, C>>) | any)>;

export type Props<P, C> =
  Readonly<P> & Readonly<{ children?: Children<P, C>; key?: Key} >;

export interface Hooks<P = {}, C = {}> {
  _beforeEach?(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>): void;
  _afterEach?(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>): void;
  beforeEach?(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>): void;
  afterEach?(props: Props<P, C>, context: Context<P, C>, step: Step<P, C>): void;
}

export type Context<P = {}, C = {}> = C & Hooks<P, C> & {
  // TODO private properties?
};
