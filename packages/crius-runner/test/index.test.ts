import { Step, createFlow } from 'crius';
import { run } from '../src';

test('test run for step', async () => {
  class Foo extends Step { }
  class Bar extends Step { }
  const dosomething = async () => void await new Promise(resolve => setTimeout(resolve));
  const caseStep = {
    key: undefined,
    props: {
      children: [
        {
          key: undefined,
          props: { children: [] },
          step: {
            key: undefined,
            props: { children: [] },
            step: Foo
          },
        },
        dosomething
      ]
    },
    step: Bar,
  };
  await run(caseStep);
})
