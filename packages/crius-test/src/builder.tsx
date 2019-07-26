import { Step } from './step';

type BaseProps<P, C> = { desc: string, action?: any }; // TODO fix type

class Builder<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  get __isBuilder() {
    return true;
  }

  run() {
    const Action = this.props.action;
    return (
      <>
        <Action />
        {this.props.children}
      </>
    );
  }
}

class Scenario<P = {}, C = {}> extends Builder<P, C> {}

class Given<P = {}, C = {}> extends Builder<P, C> {}

class When<P = {}, C = {}> extends Builder<P, C> {}

class Then<P = {}, C = {}> extends Builder<P, C> {}

export {
  Scenario,
  Given,
  When,
  Then,
}
