import { Step } from './step';

type BaseProps<P, C> = { desc: string, action?: any }; // TODO fix type



class Scenario<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    const Action = this.props.action;
    return (
      <>
        <Action />
        {this.props.children}
      </>
    );
  }
}

class Given<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    const Action = this.props.action;
    return (
      <>
        <Action />
        {this.props.children}
      </>
    );
  }
}

class When<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    const Action = this.props.action;
    return (
      <>
        <Action />
        {this.props.children}
      </>
    );
  }
}

class Then<P = {}, C = {}> extends Step<P & BaseProps<P, C>, C> {
  run() {
    console.log(this.props.desc);
    const Action = this.props.action;
    return (
      <>
        <Action />
        {this.props.children}
      </>
    );
  }
}

export {
  Scenario,
  Given,
  When,
  Then,
}
