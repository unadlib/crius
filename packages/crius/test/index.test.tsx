import { Step, createFlow } from "../src";

test("base import Step with JSX", () => {
  class Foo extends Step {}
  class Bar extends Step {
    run() {
      return <Foo />;
    }
  }
  const bar = <Bar />;
  expect(bar).toEqual({
    key: "Bar",
    props: { children: [] },
    step: Bar,
  });
});

test("base Step fragment with JSX", () => {
  class Foo extends Step {}
  const Bar = () => {};
  const bar = (
    <>
      <Bar />
      <Foo />
    </>
  );
  expect(bar).toEqual({
    key: "",
    props: {
      children: [
        {
          key: "Bar",
          props: { children: [] },
          step: Bar,
        },
        {
          key: "Foo",
          props: { children: [] },
          step: Foo,
        },
      ],
    },
    step: undefined,
  });
});
