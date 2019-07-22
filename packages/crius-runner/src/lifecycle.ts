import { Step } from 'crius';

export const runWithLifecycle = async (step: Step): Promise<any> => {
  if (typeof step.stepWillStart == 'function') {
    await step.stepWillStart();
  }
  const nextStep = await step.run();
  if (typeof step.stepDidEnd == 'function') {
    await step.stepDidEnd();
  }
  return nextStep;
}
