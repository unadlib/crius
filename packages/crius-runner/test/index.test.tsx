import Crius, { Step, FunctionStep } from 'crius';
import { run } from '../src';

test('runner with JSX', async () => {
  const result: string[] = [];
  class Foo extends Crius.Step<{foo: string}> {
    run() {
      result.push(this.props.foo);
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
    run() {
      result.push(this.props.bar);
      return this.props.children;
    }
  }

  await run(<Foo foo='foo' />);
  expect(result).toEqual([
    'foo'
  ]);

  // await run(<Bar bar='bar'><Foo foo='foo' /></Bar>);
  // expect(result).toEqual([
  //   'bar',
  //   'foo'
  // ]);
});
