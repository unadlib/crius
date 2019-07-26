import {
  Step as BaseStep,
  autorun,
  title,
  examples,
  Scenario,
  Given,
  When,
  Then,
  afterEach,
  beforeEach,
  plugins
} from 'crius-test';
import logger from '../';


@plugins([logger()])
class Step<P = {}, C = {}> extends BaseStep<P, C> {}


@autorun(test)
@title('Send text message on compose text page')
class SendSMS1 extends Step {
  async stepDidEnd() {
    const a = this.context;
    debugger;
  }

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

class EntryPoint extends Step {
  run() {
    return (
      <>
        <Prepare />
        <Entry />
        <Entry.UT />
        <Entry.IT />
        <Login />
      </>
    );
  }
}

class NavigateToComposeText extends Step {
  run() {
    console.log('Prepare');
  }
}

class TextSmsMessage extends Step<{}, {inputText: string}> {
  run() {
    this.context.inputText = 'inputText';
  }
}

class CheckSmsMessage extends Step<{}, {inputText: string}> {
  run() {
    expect(this.context.inputText).toEqual('inputText');
  }
}

class Prepare extends Step {
  run() {
    console.log('Prepare');
  }
}
class Entry extends Step {
  static UT() {
    console.log('Entry.UT')
  }
  
  static IT() {
    console.log('Entry.IT');
  }

  run() {
    console.log('Entry');
  }
}
const Login = () => console.log('Login');