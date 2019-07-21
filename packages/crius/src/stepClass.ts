import { CriusNode } from './flow';

export type Key = string | undefined | null;

export type Props<P = {}> =
  Readonly<P> & Readonly<{ children?: CriusNode<P>[] }> & { key?: Key };

interface Params<P> {
  props: Props<P>;
}
interface Step<P> {
  props: Props<P>;
  run(...args: any[]): Promise<CriusNode<P> | any> | any;
}

class Step<P = {}> {
  constructor({
    props,
  }: Params<P>) {
    this.props = props;
  }

  get isCriusStep() {
    return true;
  }
}

export {
  Step as default,
}
