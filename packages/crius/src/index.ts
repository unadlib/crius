import Step, { Children } from './stepClass';
import { createFlow, CriusNode }  from './flow';
import { FunctionStep } from './stepFunction';

const Crius = {
  Step,
  createFlow,
  CriusNode,
};

export {
  Crius as default,
  Step,
  createFlow,
  CriusNode,
  FunctionStep,
  Children,
}
