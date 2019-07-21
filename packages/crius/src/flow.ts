import Step from "./stepClass";

type Key = string|undefined|null;
interface IConfig {
  [P: string]: any;
  key?: Key;
}

export interface Props {
  [P: string]: any;
  children: ReadonlyArray<IChildren>;
}

interface IOptions {
  step: Step;
  key: Key;
  props: Props;
}

type IChildren = ((...args: any[]) => any) | Flow;

export interface IFlow {
  step: Step;
  key: Key;
  props: Props;
}
class Flow implements IFlow {
  public step: Step;
  public key: Key;
  public props: Props;

  constructor({
    step,
    key,
    props
  }: IOptions) {
    this.step = step;
    this.key = key;
    this.props = props;
  }
}

function createFlow(
  step: Step,
  config: IConfig,
  ...children: ReadonlyArray<IChildren>
): Flow {
  const props: Props = {
    children,
    ...config,
  };
  const key = config.key;
  return new Flow({
    step,
    key,
    props
  });
}

export {
  createFlow,
}
