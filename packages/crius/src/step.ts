
import { CriusNode } from './flow';
import StepClass from './stepClass';
import { StepFunction } from './stepFunction';

export type Step<P, C> = StepClass<P, C> | StepFunction<P, C>;

export type Key = string | undefined | null;

export type Children<P, C> = ReadonlyArray<(CriusNode<Step<P, C>, P, C> | ((props: Props<P, C>) => Promise<CriusNode<Step<P, C>, P, C>>) | any)>;

export type Props<P, C> =
  Readonly<P> & Readonly<{ children?: Children<P, C> }> & { key?: Key };

export type Context<C = {}> = C & {
  // TODO
};

