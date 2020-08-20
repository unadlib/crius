import { isCriusFlow } from "crius-is";
import { Step } from "./step";
import { compileString } from "./utils";

interface BuilderProps {
  desc: string;
  action?: any; // TODO fix jsx element type error.
}

class Builder<P = {}, C = {}> extends Step<P & BuilderProps, C> {
  constructor(props: P & BuilderProps, context: C) {
    super(props, context);
    if (
      typeof this.props.desc === "string" &&
      typeof this.context.example === "object"
    ) {
      Object.defineProperty(this.props, "desc", {
        configurable: true,
        enumerable: true,
        writable: false,
        value: compileString(this.props.desc, this.context.example),
      });
    }
  }

  get __isBuilder() {
    return true;
  }

  run() {
    const Action = this.props.action;
    if (
      Object.hasOwnProperty.call(this.props, "action") &&
      typeof Action === "undefined"
    ) {
      throw new Error(
        `The action of Step with desc '${this.props.desc}' is 'undefined'.`
      );
    }
    return (
      <>
        {isCriusFlow(Action) ? Action : <Action />}
        {this.props.children}
      </>
    );
  }
}

class Scenario<P = {}, C = {}> extends Builder<P, C> {}

class Given<P = {}, C = {}> extends Builder<P, C> {}

class When<P = {}, C = {}> extends Builder<P, C> {}

class Then<P = {}, C = {}> extends Builder<P, C> {}

class And<P = {}, C = {}> extends Builder<P, C> {}

export { Scenario, Given, When, Then, And };
