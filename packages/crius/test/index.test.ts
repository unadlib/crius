import { Step, createFlow } from '../src'; 

test('base Step', () => {
  class Foo extends Step {}
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: undefined,
    props: {children: []},
    step: Foo,
  });
});

test('base import Step', () => {
  class Foo extends Step {}
  const foo = createFlow(Foo, {});
  class Bar extends Step {
    run() {
      return createFlow(foo, {})
    }
  }
  const bar = createFlow(Bar, {});
  expect(bar).toEqual({
    key: undefined,
    props: {children: []},
    step: Bar,
  });
});

test('base composition Step', () => {
  class Foo extends Step {}
  const foo = createFlow(Foo, {});
  class Bar extends Step {}
  const bar = createFlow(Bar, {}, createFlow(foo, {}));
  expect(bar).toEqual({
    key: undefined,
    props: {children: [
      {
        key: undefined,
        props: {children: []},
        step: {
          key: undefined,
          props: {children: []},
          step: Foo
        },
      }
    ]},
    step: Bar,
  });
});
