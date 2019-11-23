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
    // '_beforeEach',
    // '_afterEach'
  ]);
});

test('handleContext fix _afterEach context', () => {
  const _beforeEach = () => {};
  const _afterEach = () => {};
  const context = handleContext({
    _beforeEach,
  });
  expect(Object.keys(context)).toEqual([
    '_beforeEach',
  ]);
  expect(context._beforeEach).toEqual(_beforeEach);
  expect(context._afterEach).toBeTruthy();
  try {
    context._afterEach = _afterEach;
  } catch(e) {
    expect(e.toString()).toEqual(`TypeError: Cannot assign to read only property '_afterEach' of object '#<Object>'`);
    expect(context._afterEach).not.toEqual(_afterEach);
  }
});

test('handleContext fix _beforeEach context', () => {
  const _beforeEach = () => {};
  const _afterEach = () => {};
  const context = handleContext({
    _afterEach,
  });
  expect(Object.keys(context)).toEqual([
    '_afterEach',
  ]);
  expect(context._afterEach).toEqual(_afterEach);
  expect(context._beforeEach).toBeTruthy();
  try {
    context._beforeEach = _beforeEach;
  } catch(e) {
    expect(e.toString()).toEqual(`TypeError: Cannot assign to read only property '_beforeEach' of object '#<Object>'`);
    expect(context._beforeEach).not.toEqual(_beforeEach);
  }
});

test('handleContext fix beforeEach &  afterEach context', () => {
  const beforeEach = jest.fn((props, context, step) => {});
  const afterEach = jest.fn((props, context, step) => {});
  const context = handleContext({
    beforeEach,
    afterEach,
  });
  expect(Object.keys(context)).toEqual([
    'beforeEach',
    'afterEach',
  ]);
  const step1 = () => {};
  const step2 = new Step({}, {});
  context._beforeEach!({children: []}, {}, step1);
  context._afterEach!({children: []}, {}, step2);
  expect(beforeEach.mock.calls[0]).toEqual([{children: []}, {}, step1]);
  expect(afterEach.mock.calls[0]).toEqual([{children: []}, {}, step2]);
});

