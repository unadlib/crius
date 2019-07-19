import Step from "./stepClass";

type Key = string|undefined|null;
interface IConfig {
  [P: string]: any;
  key?: Key;
}

interface Props {
  [P: string]: any;
  children: ReadonlyArray<IChildren>;
}

interface IOptions {
  step: Step;
  key: Key;
  props: Props;
}

type IChildren = ((...args: any[]) => any) | Flow;

class Flow {
  private step: Step;
  private key: Key;
  private props: Props;

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
