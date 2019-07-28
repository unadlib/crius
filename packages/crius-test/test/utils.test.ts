import {
  parserString,
  compileString
} from '../src/utils';

test('test `parserString`', () => {
  const object = parserString(`
    | accountTag   | contactType | smsMessage |
    | us           | personal    | aaa        |
    | uk           | company     | bbb        |
    | ca           | all         | xxx        |
  `);
  expect(object).toEqual([
    {
      "smsMessage": "aaa",
      "contactType": "personal",
      "accountTag": "us"
    },
    {
      "smsMessage": "bbb",
      "contactType": "company",
      "accountTag": "uk"
    },
    {
      "smsMessage": "xxx",
      "contactType": "all",
      "accountTag": "ca"
    }
  ]);
});

test('test `parserString` with Error', () => {
  for (const item of [
    `
      | accountTag   | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca           | all         | xxx        | |
    `,
    `
      | accountTag  | | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca           | all         | xxx        |
    `,
    `
      | accountTag  | contactType | smsMessage |
      | us           | personal    | aaa        |
      | uk           | company     | bbb        |
      | ca      ||   |  all         | xxx        |
    `
  ]) {
    try {
      const object = parserString(item);
    } catch(e) {
      expect(e.toString().replace(/\s+/g, '')).toEqual(new Error(`
      Unexpected string formats, for example:
        \`
        | fooField  | barField  |
        | test_a    | test_c    |
        | test_b    | test_d    |
        \`
        Parse to:
        [
          {
            fooField: 'test_a',
            barField: 'test_c'
          },
          {
            fooField: 'test_b',
            barField: 'test_d'
          }
        ]`).toString().replace(/\s+/g, ''));
    }
  }
});

test('test `compileString`', () => {
  expect(compileString('test ${a}', {
    a:'1',
  })).toEqual('test 1');
  expect(compileString('test ${a} test', {
    a:1,
  })).toEqual('test 1 test');
  expect(compileString('test ${a} ${b} test', {
    a: '\'1\'',
    b: true
  })).toEqual(`test '1' true test`);
  expect(compileString('test ${a} ${b} test', {
    a: {},
    b: []
  })).toEqual(`test [object Object]  test`);
  try {
    compileString('test ${a} ${b} test', {})
  } catch(e) {
    expect(e.toString()).toEqual('ReferenceError: a is not defined');
  }
});
