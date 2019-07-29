# crius
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
 - [ ] implement `stepDidCatch(error, info)`
 - [ ] crius graph enhancement
 - [ ] implement crius cli for view AC text, etc.
 - [ ] CI/CD
 