import { run } from 'crius-runner';
import { Step } from './step';

const test = (global as any).test;

function autorun(): any {
  return function(target: Step) {
    test(target.title, async () => {
      await run({
        key: target.name,
        props: { children: [] },
        step: target
      }, {});
    });
  }
}

function title(title: string): any {
  return function(target: Step) {
    target.title = title; 
  }
}
// TODO parser `TemplateStringsArray` to `object` and compatible with object parameter.
function examples(params: TemplateStringsArray) {
  return function(target: Step, name: string, descriptor: TypedPropertyDescriptor<any>) {
    target.params = params;
    return descriptor;
  }
}

export {
  autorun,
  title,
  examples
}
