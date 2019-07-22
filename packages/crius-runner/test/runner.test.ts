import { Step, FunctionStep } from 'crius';
import { run } from '../src';

test('base runner without return value', async () => {
  const result: string[] = [];
  class Test extends Step<{foobar: string}> {
    run() {
      result.push(this.props.foobar);
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual([
    'foobar',
  ]);
});

test('function step', async () => {
  const result: string[] = [];
  const Bar: FunctionStep<{bar: string}> = async (props) => {
    await new Promise(resolve => setTimeout(resolve));
    result.push(props.bar);
  };
  await run({
    key: 'Bar',
    props: {
      bar: 'bar'
    },
    step: Bar
  });
  expect(result).toEqual([
    'bar',
  ]);
});

test('base runner with return function', async () => {
  const result: string[] = [];
  class Test extends Step<{foobar: string}> {
    run() {
      return () => result.push(this.props.foobar)
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual([
    'foobar',
  ]);
});


test('base runner with return async function', async () => {
  const result: string[] = [];
  class Test extends Step<{foobar: string, foo: string}> {
    run() {
      return async () => (
        await new Promise(resolve => {
          setTimeout(resolve);
        }).then(() => {
          result.push(this.props.foo)
        }),
        result.push(this.props.foobar)
      )
    }
  }
  const caseStep = {
    key: 'Test',
    props: {
      foobar: 'foobar',
      foo: 'foo',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual([
    'foo',
    'foobar',
  ]);
});
