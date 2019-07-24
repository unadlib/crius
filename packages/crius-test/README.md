# crius-test


## Example
```jsx
@title('Send text message on compose text page')
@tags('widgets')
@drivers('ut', 'e2e.puppeteer')
@level('p0')
class SendSMS extends Step {
  @examples`
    | accountTag   | contactType | smsMessage |
    | us           | personal    | aaa        |
    | uk           | company     | bbb        |
    | ca           | all         | xxx        |
  `
  run() {
    return (
      <Scenario desc='user enter entrypoint' action={EntryPoint}>
        <Given desc='user navigate to compose text page' action={NavigateToComposeText} />
        <When desc='user type ${smsMessage} in input field' action={TextSmsMessage} />
        <Then desc='user should see that input field text is ${smsMessage}' action={CheckSmsMessage} />
      </Scenario>
    )
  }
}
```

## Support Testing Framework

* Jest
* Mocha
* Jasmine
