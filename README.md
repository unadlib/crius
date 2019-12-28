# crius

[![Travis](https://img.shields.io/travis/unadlib/crius.svg)](https://travis-ci.org/unadlib/crius)
[![npm](https://img.shields.io/npm/v/crius.svg)](https://www.npmjs.com/package/crius)

A testing tool for behavior-driven development, inspired by [Cucumber](https://github.com/cucumber/cucumber) and [React](https://github.com/facebook/react).

> If you want to introduce **BDD** and need good **Step** reusability, **Crius** is the BDD building tool you want. 

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Tutorial](#tutorial)
- [Examples](#examples)
- [APIs](#apis)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Features

* **Declarative and Expressive DSL** - By combining DSL characteristics of Cucumber and React
* **Re-usable Step Definitions** - Provide better Step and Scenario composition
* **Step Lifecycle** - Provide lifecycle hooks to have more control over tests
* **Plugin Support** - Allow more custom features to be easily added
* **Test Runner Agnostic** - Compatible to Jest, Mocha and Jasmine out of the box
* **Use JavaScript Literals for Examples** - Easily define complex object in examples
* **Lightweight** - Core source code is less than 17k

## Install

```bash
npm install --seve-dev crius-test
```

And the following packages are also required:
```bash
npm install --save-dev babel-preset-crius @babel/core @babel/runtime @babel/preset-env @babel/plugin-proposal-decorators
```

## Usage

Set a config for babel with `babel.config.js`.

```js
module.exports = {
  "presets": [
    ["@babel/preset-env"],
    ["babel-preset-crius"]
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
};
```

If you use `jest`, you can set up a test file, for example `index.test.js`:

```js
@autorun(it)
@title('Test user add todo item')
class TestTodoList extends Step {
  run() {
    return (
      <Scenario desc='user login website'>
        <Given desc='user navigate to list page' />
        <When desc='user type "read book" in input field and click "add" button' />
        <Then desc='user should see "read book" todo item in todo list' />
      </Scenario>
    )
  }
}
```

If you use mocha v6, you can install `@babel/register`, you can set the following command:

```bash
mocha --require @babel/register
```

If you use jasmine, you can add the following config in `jasmine.json`:

```json
{
  "helpers": [
    "../node_modules/@babel/register/lib/node.js",
    // ...
  ]
}
```

## Examples

[Using `crius-test` for initialized the project with `create-react-app`](https://github.com/unadlib/crius-react-example)

## APIs

* `@autorun` - class decorator

It is used to pass test runner, such as `@autorun(test)` in Jest, if you need to skip `@autorun(test.skip)`

* `@title` - class decorator

`@title` is used to set the test name, it also supports parameter templates from the `@examles` definition.

```
@title('User add ${todo} item in todo list page')
```

* `@examples` - property descriptor

`@examples` are used to set up different test cases.

It can only define the 'run' property of Class Step, and it supports `Table` in Markdown and `Array` in JavaScript.

`Table` in Markdown:

```js
class TestTodoList extends Step {
  @examples`
    | addText               | completed |
    | 'Learning TypeScript' | true      |
    | 'Swimming'            | false     |
  `
  run() {}
}    
```

`Array` in JavaScript:

```js
class TestTodoList extends Step {
  @examples([
    {
      addText: 'Learning TypeScript',
      completed: true,
    },
    {
      addText: 'Swimming',
      completed: false,
    },
  ])
  run() {}
}    
```

* `@beforeEach` - class descriptor

It is used to set up functions that need to be executed **before** execution of step.

```js
@beforeEach((props, context, step) => {})
```

* `@afterEach` - class descriptor

It is used to set up functions that need to be executed **after** execution of step.

```js
@beforeEach((props, context, step) => {})
```

* `@plugins` - class descriptor

`@plugins` are used to set up plug-ins that are differently encapsulated by abstraction.

```js
@plugins([{
  beforeEach: (props, context, step) => {},
  afterEach: (props, context, step) => {},
}])
```

* `@params` - class descriptor

It helps to process `examples` parameters.

```js
@params((examples) => examples)
```

* `context` - class static property

```js
import { Step as BaseStep } from 'crius-test';

class Step extends BaseStep {
  static get context() {
    return {
      // Define context
    };
  }
}
```

### Class Step
In **Class Step**, you can access the props value by using the Step parameter by `this.props` and you can access any value defined in the context by `this.context`. The asynchronous `run` property in **Class Step** is used to define the running step script.

**Class Step** also provides `stepStart` and `stepDidEnd` lifecycles, it supports asynchronous too.

```jsx
class TypeTodo extends Step {
  async run() {
    await this.context.page.type('.input', this.props.todo);
  }
}

TypeTodo.prototype.defaultProps = {
  todo: '',
};
```

### Function Step
```jsx
const SimpleStep = aysnc (props, context) => {};
```
**Function Step** supports asynchronous too. Its first argument is `props`, and the second argument is `context`.

For example:

```jsx
const TypeTodo = async ({ text }, { page }) => {
  await page.type('.input', text);
}

TypeTodo.defaultProps = {
  todo: '',
};
```

### Step Usage

You can define some steps, and it's like using it as follows:

```jsx
const AddTodo = () => 
  <>
    <TypeTodo text='Learning TypeScript' />
    <SubmitTodo />
  </>
```

## FAQ

1. How to use crius test React?

```js
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MyComponent from './MyComponent';
import Foo from './Foo';

it('renders three <Foo /> components', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.find(Foo)).to.have.lengthOf(3);
});
```

You have to use the following writing instead.

```js
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

const checkMyComponent = () => {
  const myComponent = React.createElement(eval(transformFileSync('./MyComponent.tsx').code));
  const wrapper = shallow(myComponent);
  const foo = eval(transformFileSync('./Foo.tsx').code);
  expect(wrapper.find(Foo)).to.have.lengthOf(3);
}
```

And set up a babel config file for Crius: 

For example `babel-crius.js`: 

```js
module.exports = require('babel-jest').createTransformer({
  "presets": [
    ["@babel/preset-env"],
    ["babel-preset-crius"]
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
});
```

Finally, set up jest `transform`:

```
"transform": {
  "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/babel-crius.js",
},
```

2. How to use crius for building E2E test with Puppeteer?

Yes, and the example is simple.

```jsx
const OpenBrowser = async (_, context) => {
  context.browser = await puppeteer.launch();
  context.page = await browser.newPage();
}

const GotoPage = async (_, { page }) => {
  await page.goto('http://todo-example.com');
}

const AddTodo = async (_, { page, example }) => {
  await page.type('.input', example.todo);
  await page.click('.addButton');
}

const CheckTodo = async (_, { browser, page, example }) => {
  const todoText = await page.$eval('.item', element => element.innerText);
  expect(todoText).toBe(example.todo);
  await browser.close();
}

@autorun(test)
@title('User add ${todo} item in todo list page')
class CheckingAddTodo extends Step {
  @examples`
    | todo           |
    | 'Learning C++' |
  `
  run() {
    return (
      <Scenario desc='User open the browser and create new page' action={OpenBrowser}>
        <Given desc='User go to the todo list page' action={GotoPage} />
        <When desc='User type ${todo} text and clicks "add" button' action={AddTodo} />
        <Then desc='User should see the new ${todo} item in list' action={CheckTodo} />
      </Scenario>
    )
  }
}
```

## Support

* Jest
* Mocha
* Jasmine

## License
MIT
