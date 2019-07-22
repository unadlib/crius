import { CriusNode } from 'crius';

type Key = string | undefined | null;

interface EemptyStep<P = {}> {}

async function run<S extends EemptyStep<P>, P = {}>({
  step: Step,
  key: Key,
  props
}: CriusNode<S, P>) {
  if (typeof Step === 'function') {
    let nextStep;
    if (Step.prototype.isCriusStep) {
      const step = new (Step as any)(
        props
      );
      nextStep = await step.run();
    } else {
      nextStep = await Step(props);
    }
    if (nextStep) {
      if (typeof nextStep === 'function') {
        await nextStep();
      } else if (toString.call(nextStep) === '[object Object]') {  // TODO: check CriusNode
        await run(nextStep);
      } else if (Array.isArray(nextStep)) {
        for (const child of nextStep) {
          if (typeof child === 'function') {
            await child();
          } else if (toString.call(child) === '[object Object]') { // TODO: check CriusNode
            await run(child);
          } else {
            throw new Error('error type');
          }
        }
      }
    }
  }
}

export {
  run,
}