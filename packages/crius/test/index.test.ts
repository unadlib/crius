import { Step, createFlow } from '../src';

test('base import Step', () => {
  class Foo extends Step { }
  class Bar extends Step {
    run() {
      return createFlow(Foo, {})
    }
  }
  const bar = createFlow(Bar, {});
  expect(bar).toEqual({
    key: undefined,
    props: { children: [] },
    step: Bar,
  });
});

test('base composition Step', () => {
  class Foo extends Step { }
  class Bar extends Step { }
  const dosomething = async () => void await new Promise(resolve => setTimeout(resolve));
  const bar = createFlow(Bar, { test: 1 }, createFlow(Foo, { test: 2 }), dosomething);
  expect(bar).toEqual({
    key: undefined,
    props: {
      children: [
        {
          key: undefined,
          props: { children: [], test: 2 },
          step: Foo,
        },
        dosomething
      ],
      test: 1
    },
    step: Bar,
  });
});
