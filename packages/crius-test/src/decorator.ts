import { Step } from 'crius';
import { run } from 'crius-runner';

const test = (global as any).test;

function autorun(): any {
  return function(target: Step) {
    test('test =====', async () => {
      await run({
        key: (target as any).name,
        props: { children: [] },
        step: target
      }, {});
    });
  }
}

function title(title: string): any {
  return function(target: Step) {
    console.log(title)
  }
}

function examples(params: TemplateStringsArray) {
  return function(target: Step, name: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log(params[0])
    return descriptor;
  }
}

export {
  autorun,
  title,
  examples
}
