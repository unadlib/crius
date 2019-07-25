import { CriusNode, Step as StepClass, Children, Context } from 'crius';
import { isCriusNode } from 'crius-is';
import { runWithLifecycle } from './lifecycle';
import { handleContext } from './context';

type Key = string | undefined | null;

interface EemptyStep<P = {}, C = {}> { };

async function iterateChildren<S, P, C>(
  children: Children<P, C>,
  context?: Context<P, C>
): Promise<void> {
  for (const child of children) {
    if (typeof child === 'function') {
      await child();
    } else if (isCriusNode(child)) {
      await run(child as CriusNode<S, P, C>, context as Context<P, C>);
    } else if (Array.isArray(child)) {
      await iterateChildren(child, context);
    } else {
      throw new Error('Unexpected Error Crius Step Type.');
    }
  }
}

/**
 * Run A CriusNode
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
 * @param CriusNode 
 */
async function run<S extends EemptyStep<P, C>, P = {}, C = {}>(
  {
    step: Step,
    key: Key,
    props
  }: CriusNode<S, P, C>,
  _context?: Context<P, C>
) {
  const context = handleContext<P, C>(_context as Context);
  if (typeof Step === 'function') {
    let nextStep;
    let stepAction;
    let afterLifecycleAction;
    if (Step.prototype.isCriusStep) {
      // TODO fix type
      const step: StepClass = new (Step as any)(
        props,
        context,
      );
      await context._beforeHook!(props, context, step);
      [nextStep, afterLifecycleAction] = await runWithLifecycle(step);
      stepAction = step;
    } else {
      // TODO fix type
      await context._beforeHook!(props, context, Step as any);
      nextStep = await Step(props, context);
      stepAction = Step;
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
    if (Step.prototype.isCriusStep) {
      await afterLifecycleAction();
    }
    // TODO fix type
    await context._afterHook!(props, context, stepAction as any);
  } else if (Array.isArray(props.children)) {
    await iterateChildren(props.children, context);
  }
}

export {
  run,
}