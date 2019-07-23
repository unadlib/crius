import { Step } from 'crius';
import { run } from '../src';

test('base runner with step class for context', async () => {
  const result: string[] = [];
  class Foo extends Step<{foo: string}, { bar: string }> {
    async run() {
      await new Promise(resolve => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  const caseStep = {
    key: 'Foo',
    props: {
      children: [],
      foo: '1',
    },
    step: Foo,
  };
  await run(caseStep, { bar: 'bar' });
  expect(result).toEqual([
    'bar'
  ]);
});

test('base runner with extended step class for context', async () => {
  const result: string[] = [];
  class Foo<P = {}, C = {}> extends Step<P & {foo: string}, C & { bar: string }> {}

  class Foo1 extends Foo<{foo1: string}> {
    async run() {
      await new Promise(resolve => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  const caseStep = {
    key: 'Foo1',
    props: {
      children: [],
      foo: '1',
    },
    step: Foo1,
  };
  await run(caseStep, { bar: 'bar' });
  expect(result).toEqual([
    'bar',
  ]);
});


test('base runner with deep step class for context', async () => {
  const result: string[] = [];
  class Foo<P = {}, C = {}> extends Step<P & {foo: string}, C & { bar: string }> {}

  class Foo1 extends Foo<{foo1: string}> {
    async run() {
      await new Promise(resolve => setTimeout(resolve));
      result.push(this.context.bar);
      return this.props.children;
    }
  }

  class Bar extends Foo {
    run() {
      result.push(this.context.bar);
    }
  }

  const caseStep = {
    key: 'Foo1',
    props: {
      children: [
        {
          key: 'Foo1',
          props: { children: [] },
          step: Bar,
        }
      ],
      foo: '1',
    },
    step: Foo1,
  };
  await run(caseStep, { bar: 'bar' });
  expect(result).toEqual([
    'bar',
    'bar'
  ]);
});