import { Step, createFlow } from 'crius/src';
import { run } from '../src';

test('test run for step', async () => {
  const result: string[] = [];
  class Foo extends Step {
    run() {
      result.push(this.props.foo);
    }
  }
  class Bar extends Step {
    run() {
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const dosomething = async () => void await new Promise(resolve => setTimeout(resolve));
  // Test raw JSX code:
  // <Bar>
  //   <Foo/>
  //   {dosomething}
  // </Bar>
  const caseStep = {
    key: undefined,
    props: {
      children: [
        {
          key: undefined,
          props: { children: [], foo: 'foo' },
          step: Foo,
        },
        dosomething
      ],
      bar: 'bar',
    },
    step: Bar,
  };
  await run(caseStep);
  expect(result).toEqual([
    'bar',
    'foo'
  ]);
});
