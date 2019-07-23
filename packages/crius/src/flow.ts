import { Props, Key, Children } from './step';

type Config<P> = { key?: Key } & P;
interface Options<S, P, C> {
  step: S;
  key: Key;
  props: Props<P, C>;
}

// TODU: use 'infer' derivation.
interface EemptyStep<P = {}, C = {}> { }

class CriusNode<S, P, C>  {
  public step: S;
  public key: Key;
  public props: Props<P, C>;

  constructor({
    step,
    key,
    props
  }: Options<S, P, C>) {
    this.step = step;
    this.key = key;
    this.props = props;
  }
}

function createFlow<S extends EemptyStep<P, C>, P = {}, C = {}>(
  step: S,
  config: Config<P>,
  ...children: Children<P, C>
): CriusNode<S, P, C> {
  const props: Props<P, C> = {
    children,
    ...config,
  };
  let key = '';
  if (typeof step === 'function') {
    if (step.prototype.isCriusStep) {
      key = step.name || step.prototype.constructor.name;
    } else {
      key = step.name || (step.prototype ? step.prototype.constructor.name : 'anonymous');
    }
  }
  key = config && config.key ? config.key : key;
  return new CriusNode({
    step,
    key,
    props
  });
}

export {
  createFlow,
  CriusNode,
}
