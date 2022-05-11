import { isCriusNode } from "crius-is";
import { StepType, CriusNode } from "crius";
import { Step } from "./step";
import { compileString } from "./utils";
import { StepFunction } from "crius/src";

interface BuilderProps {
  desc: string;
  action?:
    | StepType<any, any>
    | CriusNode<any, any>
    | (StepType<any, any> | CriusNode<any, any>)[];
}

const injectExample = (Action: StepFunction<any>) => {
  const ActionWithExample = ((props, context) => {
    return <Action {...context.example} />;
  }) as StepFunction<any, { example?: Record<string, any> }>;
  return ActionWithExample;
};

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

  static get __isBuilder() {
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
    let StepAction: StepType | CriusNode<any, any>[] = () => {};
    if (!isCriusNode(Action)) {
      StepAction = Array.isArray(Action)
        ? Action.map((item) => {
            const Item = injectExample(item as StepFunction);
            return isCriusNode(item) ? item : <Item />;
          })
        : injectExample(Action as StepFunction);
    }
    return (
      <>
        {isCriusNode(Action) ? (
          Action
        ) : Array.isArray(StepAction) ? (
          StepAction
        ) : (
          <StepAction />
        )}
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
