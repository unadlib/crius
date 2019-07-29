# crius

[![Travis](https://img.shields.io/travis/unadlib/crius.svg)](https://travis-ci.org/unadlib/crius)
[![npm](https://img.shields.io/npm/v/crius.svg)](https://www.npmjs.com/package/crius)

A testing tool for behavior-driven development.

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

If you use `jest`, you can set up a test file, for example `index.test.jsx`:

```jsx
@autorun(test)
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

## Support Testing Framework

* Jest
* Mocha
* Jasmine

## TODO

- [x] import `context` for crius step
- [x] logger and parering steps for step runner
- [ ] CI/CD
- [ ] implement `stepDidCatch(error, info)`
- [ ] crius graph enhancement
- [ ] implement crius cli for view AC text, etc
- [ ] crius steps viewer enhancement
