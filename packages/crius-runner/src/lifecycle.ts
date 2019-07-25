import { Step } from 'crius';

export const runWithLifecycle = async <P, C>(step: Step<P, C>): Promise<any> => {
  let nextStep;
  if (typeof step.stepWillStart == 'function') {
    await step.stepWillStart();
  }
  if (typeof step.run === 'function') {
    nextStep = await step.run(step.params);
  }
  return [
    nextStep,
    async () => {
      if (typeof step.stepDidEnd == 'function') {
        await step.stepDidEnd();
      }
    }
  ];
}
