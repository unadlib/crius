import { CriusNode, Step as StepClass, Children, Context } from 'crius';
import { isCriusNode } from 'crius-is';
import { runWithLifecycle } from './lifecycle';

type Key = string | undefined | null;

interface EemptyStep<P = {}, C = {}> {};

async function iterateChildren<S, P, C>(
  children: Children<P, C>,
  context?: Context<C>
): Promise<void>{
  for (const child of children) {
    if (typeof child === 'function') {
      await child();
    } else if (isCriusNode(child)) {
      await run(child as CriusNode<S, P, C>, context as Context<C>);
    } else if (Array.isArray(child)) {
      await iterateChildren(child, context);
    } else {
      throw new Error('Unexpected Error Crius Step Type.');
    }
  }
}

/**
 * Run A CriusNode
 * @param CriusNode 
 */
async function run<S extends EemptyStep<P, C>, P = {}, C = {}>(
  {
    step: Step,
    key: Key,
    props
  }: CriusNode<S, P, C>,
  context?: Context<C>
) {
  if (typeof Step === 'function') {
    let nextStep;
    if (Step.prototype.isCriusStep) {
      // TODO fix type
      const step: StepClass = new (Step as any)(
        props,
        context,
      );
      nextStep = await runWithLifecycle(step);
    } else {
      nextStep = await Step(props, context);
    }
    if (nextStep) {
      if (typeof nextStep === 'function') {
        await nextStep();
      } else if (isCriusNode(nextStep)) {
        await run(nextStep, context);
      } else if (Array.isArray(nextStep)) {
        await iterateChildren(nextStep, context);
      }
    }
  } else if (Array.isArray(props.children)) {
    /*
      Run flow with Crius Fragment.
      For example: 
      <>
        <Bar bar='bar' />
        <FooBar fooBar='fooBar' />
      </>
      It will parser to:
      {
        key: '',
        props: {
          children: [
            {
              key: '',
              props: { children: [], bar: 'bar' },
              step: Bar
            },
            {
              key: '',
              props: { children: [], fooBar: 'fooBar' },
              step: FooBar
            }
          ]
        }
        step: undefined
      }
    */
    await iterateChildren(props.children, context);
  }
}

export {
  run,
}