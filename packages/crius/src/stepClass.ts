import { Props } from './flow';

interface IStep {
  props: Props;
  run?(...args:[]): any; 
}

interface IProps {
  props: Props;
}

class Step implements IStep {
  public props: Props;

  constructor({
    props,
  }: IProps) {
    this.props = props;
  }
}

export {
  Step as default,
}
