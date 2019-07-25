import { Step } from 'crius';
import { run } from '../src';
import { handleContext } from '../src/context';
import { exec } from 'child_process';

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

test('handleContext empty context', () => {
  const context = handleContext({});
  expect(Object.keys(context)).toEqual([
    // '_beforeHook',
    // '_afterHook'
  ]);
});

test('handleContext fix _afterHook context', () => {
  const _beforeHook = () => {};
  const _afterHook = () => {};
  const context = handleContext({
    _beforeHook,
  });
  expect(Object.keys(context)).toEqual([
    '_beforeHook',
  ]);
  expect(context._beforeHook).toEqual(_beforeHook);
  expect(context._afterHook).toBeTruthy();
  try {
    context._afterHook = _afterHook;
  } catch(e) {
    expect(e.toString()).toEqual(`TypeError: Cannot assign to read only property '_afterHook' of object '#<Object>'`);
    expect(context._afterHook).not.toEqual(_afterHook);
  }
});

test('handleContext fix _beforeHook context', () => {
  const _beforeHook = () => {};
  const _afterHook = () => {};
  const context = handleContext({
    _afterHook,
  });
  expect(Object.keys(context)).toEqual([
    '_afterHook',
  ]);
  expect(context._afterHook).toEqual(_afterHook);
  expect(context._beforeHook).toBeTruthy();
  try {
    context._beforeHook = _beforeHook;
  } catch(e) {
    expect(e.toString()).toEqual(`TypeError: Cannot assign to read only property '_beforeHook' of object '#<Object>'`);
    expect(context._beforeHook).not.toEqual(_beforeHook);
  }
});

test('handleContext fix beforeHook &  afterHook context', () => {
  const beforeHook = jest.fn((props, context, step) => {});
  const afterHook = jest.fn((props, context, step) => {});
  const context = handleContext({
    beforeHook,
    afterHook,
  });
  expect(Object.keys(context)).toEqual([
    'beforeHook',
    'afterHook',
  ]);
  const step1 = () => {};
  const step2 = new Step({
    children: [],
  }, {});
  context._beforeHook!({children: []}, {}, step1);
  context._afterHook!({children: []}, {}, step2);
  expect(beforeHook.mock.calls[0]).toEqual([{children: []}, {}, step1]);
  expect(afterHook.mock.calls[0]).toEqual([{children: []}, {}, step2]);
});

