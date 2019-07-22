import Crius, { Step, FunctionStep } from 'crius';
import { run } from '../src';
import { resolve } from 'path';

test('test run for step', async () => {
  const result: string[] = [];
  class Foo extends Step<{foo: string}> {
    run() {
      result.push(this.props.foo);
    }
  }
  class Bar extends Step<{ bar: string }> {
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

test('function step', async () => {
  const result: string[] = [];
  const Bar: FunctionStep<{bar: string}> = async (props) => {
    await new Promise(resolve => setTimeout(resolve));
    result.push(props.bar);
  };
  await run({
    key: undefined,
    props: {
      bar: 'bar'
    },
    step: Bar
  });
  expect(result).toEqual([
    'bar',
  ]);
});
