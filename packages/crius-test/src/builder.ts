import { Step, StepType } from 'crius';

type BaseProps<P, C> = { desc: string, action?: StepType<P, C> };

class Scenario<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    return this.props.children;
  }
}

class Given<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    return this.props.children;
  }
}

class When<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    return this.props.children;
  }
}

class Then<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    return this.props.children;
  }
}

export {
  Scenario,
  Given,
  When,
  Then,
}
