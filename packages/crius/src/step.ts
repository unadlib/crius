import { CriusNode } from "./flow";
import { StepClass } from "./stepClass";
import { StepFunction } from "./stepFunction";

export type StepType<P = {}, C = {}> = StepClass<P, C> | StepFunction<P, C>;

export type CriusElement = Promise<CriusNode | void> | void | CriusNode | (() => void | Promise<void>);

export type Key = string | undefined | null;

export type Children = ReadonlyArray<CriusNode | StepType | undefined | null>;

export type Props<P> = Readonly<P> &
  Readonly<{ children?: Children; key?: Key }>;
