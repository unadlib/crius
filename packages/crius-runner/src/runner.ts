import { CriusNode, Step as StepClass } from 'crius';
import { isCriusNode } from 'crius-is';
import { runWithLifecycle } from './lifecycle';

type Key = string | undefined | null;

interface EemptyStep<P = {}> {};

/**
 * Run A CriusNode
 * @param CriusNode 
 */
async function run<S extends EemptyStep<P>, P = {}>({
  step: Step,
  key: Key,
  props
}: CriusNode<S, P>) {
  if (typeof Step === 'function') {
    let nextStep;
    if (Step.prototype.isCriusStep) {
      const step: StepClass = new (Step as any)(
        props
      );
      nextStep = await runWithLifecycle(step);
    } else {
      nextStep = await Step(props);
    }
    if (nextStep) {
      if (typeof nextStep === 'function') {
        await nextStep();
      } else if (isCriusNode(nextStep)) {
        await run(nextStep);
      } else if (Array.isArray(nextStep)) {
        for (const child of nextStep) {
          if (typeof child === 'function') {
            await child();
          } else if (isCriusNode(child)) {
            await run(child);
          } else {
            throw new Error('Unexpected Error Crius Step Type.');
          }
        }
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
    for (const child of props.children) {
      if (typeof child === 'function') {
        await child();
      } else if (isCriusNode(child)) {
        await run(child);
      } else {
        throw new Error('Unexpected Error Crius Step Type.');
      }
    }
  }
}

export {
  run,
}