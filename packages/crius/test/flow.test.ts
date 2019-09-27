import { createFlow } from '../src/flow';
import Step from '../src/stepClass';
import { StepFunction } from '../src/stepFunction';

test('base flow for Step class with default props', () => {
  class Foo extends Step<{ bar: number }> { }
  Foo.prototype.defaultProps = {
    bar: 1
  };
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 1, children: [] },
    step: Foo,
  });
});

test('base flow for Step class with overriding props', () => {
  class Foo extends Step<{ bar: number }> { }
  Foo.prototype.defaultProps = {
    bar: 1
  };
  const foo = createFlow(Foo, { bar: 2 });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 2, children: [] },
    step: Foo,
  });
});

test('base flow for Step function with default props', () => {
  const Foo: StepFunction<{ bar: number }> = () => {};
  Foo.defaultProps = {
    bar: 1
  };
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 1, children: [] },
    step: Foo,
  });
});

test('base flow for Step function with overriding props', () => {
  const Foo: StepFunction<{ bar: number }> = () => {};
  Foo.defaultProps = {
    bar: 1
  };
  const foo = createFlow(Foo, { bar: 2 });
  expect(foo).toEqual({
    key: 'Foo',
    props: { bar: 2, children: [] },
    step: Foo,
  });
});
