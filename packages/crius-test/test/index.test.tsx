import { Step, autorun, title, examples, Scenario, Given, When, Then, } from '../';

@autorun(test)
@title('Send text message on compose text page')
class SMS extends Step {
  @examples`
    | accountTag   | contactType | smsText   |
    | us           | personal    | aaa       |
    | uk           | company     | bbb       |
    | ca           | all         | xxx       |
  `
  run() {
    return (
      <Scenario desc='user enter entrypoint'>
        <Given desc='user navigate to compose text page' />
        <When desc='user type ${smsText} in input field' />
        <Then desc='user should see that input field text is ${smsText}' />
      </Scenario>
    )
  }
}
