import { CriusNode } from './flow';

export interface FunctionStep<P = {}> {
  (props: P): Promise<CriusNode<P> | any> | any;
}
