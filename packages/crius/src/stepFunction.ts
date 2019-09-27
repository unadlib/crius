import { CriusNode } from './flow';
import { Step, Context, Props } from './step';

export interface StepFunction<P = {}, C = {}> {
  (props: Props<P, C>, context: Context<P, C>): Promise<CriusNode<Step<P, C>, P, C> | any> | any;
  defaultProps?: Partial<P>;
}
