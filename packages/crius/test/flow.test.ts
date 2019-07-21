import { createFlow } from '../src/flow';
import Step from '../src/stepClass';

test('base flow', () => {
  class Foo extends Step { }
  const foo = createFlow(Foo, {});
  expect(foo).toEqual({
    key: undefined,
    props: { children: [] },
    step: Foo,
  });
});