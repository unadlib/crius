import { Step, createFlow } from '../src'; 

test('base Step', () => {
  class Foo extends Step {}
  const flow = createFlow(Foo, {}, []);
  expect(flow).toEqual({
    key: undefined,
    props: {children: []},
    step: Foo,
  });
});
