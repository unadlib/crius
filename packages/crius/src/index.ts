import Step from "./stepClass";
import { Children, Context, Step as StepType, Hooks, Props } from "./step";
import { createFlow, CriusNode } from "./flow";
import { StepFunction } from "./stepFunction";

const Crius = {
  Step,
  createFlow,
  CriusNode,
};

/**
 * Avoid cumbersome file headers.
 */
if (global) {
  // Todo: Check if a global environment is introduced, and fix type.
  (global as any).Crius = Crius;
  if (!(global as any).React) {
    (global as any).React = { createElement: Crius.createFlow };
  }
}
export {
  Crius as default,
  Step,
  createFlow,
  CriusNode,
  StepFunction,
  Children,
  Context,
  StepType,
  Hooks,
  Props,
};
