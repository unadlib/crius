import { run } from 'crius-runner';
import { Step, BaseContext } from './step';

function autorun(test: Function): any {
  return function(target: typeof Step) {
    // TODO support callback(assert) for tape and ava: (t) => {}
    const baseContext: BaseContext = {
      title: target.title,
      params: target.params
    }
    test(target.title, async () => {
      await run({
        key: target.name,
        props: { children: [] },
        step: target
      }, baseContext);
    });
  }
}

function title(title: string): any {
  if (typeof title === 'undefined' || title === null) {
    throw new Error('Test case title is required.');
  }
  return function(target: typeof Step) {
    target.title = title; 
  }
}
// TODO parser `TemplateStringsArray` to `object` and compatible with object or string parameters.
function examples(params: TemplateStringsArray) {
  return function(target: Object, name: string, descriptor: TypedPropertyDescriptor<any>) {
    (target as typeof Step).params = params;
    return descriptor;
  }
}

export {
  autorun,
  title,
  examples
}
