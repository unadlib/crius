import Step from "./stepClass";

interface IConfig {
  [P: string]: any;
}

interface Props {
  [P: string]: any;
}

interface IOptions {
  step: Step;
  key: string;
  props: Props;
}

type IChildren = (() => any) | Flow;

class Flow {
  private step: Step;
  private key: string;
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
  const props = {
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
