import { Step } from 'crius';
import { run } from '../src';

test('base runner', async () => {
  const result: string[] = [];
  class Test extends Step<{foobar: string}> {
    run() {
      result.push(this.props.foobar);
    }
  }
  const caseStep = {
    key: undefined,
    props: {
      foobar: 'foobar',
    },
    step: Test,
  };
  await run(caseStep);
  expect(result).toEqual([
    'foobar',
  ]);
});
