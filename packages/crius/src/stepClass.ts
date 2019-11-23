import { CriusNode } from './flow';
import { Step, Props, Context, PickOptional } from './step';

interface StepLifecycle<P, C> {
  stepWillStart(): void;
  stepDidEnd(): void;
}

interface StepClass<P, C> extends StepLifecycle<P, C> {
  defaultProps?: PickOptional<P>;
  props: Props<P, C>;
  context: Context<P, C>;
  run(...args: any[]): Promise<CriusNode<Step<P, C>, P, C> | any> | any;
}

class StepClass<P = {}, C = {}> {
  constructor(
    props: Props<P, C>,
    context: Context<P, C>
  ) {
    this.props = props;
    this.context = context;
  }

  get isCriusStep() {
    return true;
  }
}

export {
  StepClass as default,
}
