import { CriusNode } from './flow';

export type Key = string | undefined | null;

export type Children<P> = ReadonlyArray<(CriusNode<P> | ((props: Props<P>) => Promise<CriusNode<P>>) | any)>;

export type Props<P = {}> =
  Readonly<P> & Readonly<{ children?: Children<P> }> & { key?: Key };

interface Step<P> {
  props: Props<P>;
  run(...args: any[]): Promise<CriusNode<P> | any> | any;
}

class Step<P = {}> {
  constructor(
    props: Props<P>
  ) {
    this.props = props;
  }

  get isCriusStep() {
    return true;
  }
}

export {
  Step as default,
}
