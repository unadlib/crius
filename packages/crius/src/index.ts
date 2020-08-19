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
 * Todo Check if a global environment is introduced.
 * Avoid cumbersome file headers.
 */
if (global) {
  global.Crius = Crius;
  if (!global.React) {
    global.React = { createElement: Crius.createFlow };
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
