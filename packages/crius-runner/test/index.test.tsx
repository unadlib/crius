import Crius, { FunctionStep } from 'crius';
import { run } from '../src';

test('runner with JSX', async () => {
  const result: string[] = [];
  class Foo extends Crius.Step<{foo: string}> {
    async run() {
      await new Promise(resolve => setTimeout(resolve, 100));
      result.push(this.props.foo);
    }
  }
  class Bar extends Crius.Step<{ bar: string }> {
    async run() {
      await new Promise(resolve => setTimeout(resolve));
      result.push(this.props.bar);
      return this.props.children;
    }
  }
  const FooBar: FunctionStep<{ fooBar: string }> = async (props) => result.push(props.fooBar);
  await run(
    <Bar bar='bar'>
      <Foo foo='foo' />
      <FooBar fooBar='fooBar' />
    </Bar>
  );
  expect(result).toEqual([
    'bar',
    'foo',
    'fooBar'
  ]);
});
