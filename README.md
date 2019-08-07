# crius

[![Travis](https://img.shields.io/travis/unadlib/crius.svg)](https://travis-ci.org/unadlib/crius)
[![npm](https://img.shields.io/npm/v/crius.svg)](https://www.npmjs.com/package/crius)

A testing tool for behavior-driven development.

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

* Expression Based on JSX
* Integration with AC, UT, IT & E2E
* Composition Step
* Pluggable
* Progressive Agile Tools


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

## APIs

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


## Support

* Jest
* Mocha
* Jasmine

## License
MIT
