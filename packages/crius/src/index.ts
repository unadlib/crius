import Step from './stepClass';
import { Children, Context, Step as StepType, Hooks } from './step';
import { createFlow, CriusNode }  from './flow';
import { StepFunction } from './stepFunction';

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
  (global as any).Crius = Crius;
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
}
