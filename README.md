# crius

[![Travis](https://img.shields.io/travis/unadlib/crius.svg)](https://travis-ci.org/unadlib/crius)
[![npm](https://img.shields.io/npm/v/crius.svg)](https://www.npmjs.com/package/crius)

A testing tool for behavior-driven development.

## Example
```jsx
@autorun(test)
@title('Test user add todo item')
class TestTodoList extends Step {
  run() {
    return (
      <Scenario desc='user login website' action={Login}>
        <Given desc='user navigate to list page' action={NavigateToList} />
        <When desc='user type "read book" in input field and click "add" button' action={AddTodo} />
        <Then desc='user should see "read book" todo item in todo list' action={CheckTodo} />
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
