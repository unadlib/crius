import { Step } from 'crius';

export const runWithLifecycle = async <P, C>(step: Step<P, C>): Promise<any> => {
  if (typeof step.stepWillStart == 'function') {
    await step.stepWillStart();
  }
  const nextStep = await step.run(step.params);
  if (typeof step.stepDidEnd == 'function') {
    await step.stepDidEnd();
  }
  return nextStep;
}
