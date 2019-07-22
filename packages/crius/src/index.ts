import Step, { Children } from './stepClass';
import { createFlow, CriusNode }  from './flow';
import { FunctionStep } from './stepFunction';

const Crius = {
  Step,
  createFlow,
  CriusNode,
};

if (global) {
  (global as any).Crius = Crius;
}

export {
  Crius as default,
  Step,
  createFlow,
  CriusNode,
  FunctionStep,
  Children,
}
