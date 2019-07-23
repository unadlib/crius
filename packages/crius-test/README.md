# crius-test


## Example
```jsx
@title('Send text message on compose text page')
@tags('widgets')
@drivers('ut', 'e2e.puppeteer')
@level('p0')
class SMS extends Step {
  @examples`
    | accountTag   | contactType | smsText   |
    | us           | personal    | aaa       |
    | uk           | company     | bbb       |
    | ca           | all         | xxx       |
  `
  run() {
    return (
      <Scenario desc='user enter entrypoint' action={EnterEntrypoint}>
        <Given desc='user navigate to compose text page' action={NavigateToComposeText} />
        <When desc='user type ${smsText} in input field' action={TypeTextSMS} />
        <Then desc='user should see that input field text is ${smsText}' action={CheckText}/>
      </Scenario>
    )
  }
}
```

## Support Testing Framework

* Jest
* Mocha
* Jasmine
