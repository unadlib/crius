import Crius, { IFlow } from 'crius';

async function run(flow: IFlow) {
  const {
    step: Step,
    props
  } = flow;
  if (typeof flow === 'object') {
    if (typeof Step === 'function') {
      const step = new Step({
        props
      });
      const nextStep = await step.run();
      if (nextStep) {
        if (typeof nextStep === 'function') {
          await nextStep();
        } else if (toString.call(nextStep) === '[object Object]') {
          await run(nextStep);
        } else if (Array.isArray(nextStep)) {
          for (const child of nextStep) {
            if (typeof child === 'function') {
              await child();
            } else if (toString.call(child) === '[object Object]') {
              await run(child);
            } else {
              throw new Error('error type');
            }
          }
        }
      }
    }
  } else {
    throw new Error('error type');
  }
}

export {
  run,
}