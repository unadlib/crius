import { Step as BaseStep, autorun, title, examples, Scenario, Given, When, Then, afterEach, beforeEach, plugins } from '../';


// @beforeEach((props, context, step) => {
//   console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'beforeEach');
// })
// @afterEach((props, context, step) => {
//   console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'afterEach');
// })
// @plugins<{}, {s: string}>([
//   {
//     beforeEach(props, context, step) {
//       console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'plugins beforeEach');
//     },
//     afterEach(props, context, step) {
//       console.log(context.s, '22222=======')
//       console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'plugins afterEach');
//     }
//   },
//   {
//     beforeEach(props, context, step) {
//       console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'plugins beforeEach');
//     },
//     afterEach(props, context, step) {
//       console.log(context.s, '111111=======')
//       console.log(typeof step === 'object' ?  step.constructor.name: step.name, 'plugins afterEach');
//     }
//   }
// ])
class Step<P = {}, C = {}> extends BaseStep<P, C & { s: string }> {
  static get context(): {s: string} {
    return {
      s: '1'
    };
  }
}



@autorun(test)
@title('Send ${smsMessage} message on compose text page')
class SendSMS1 extends Step {
  // static afterEach(a) {
  //   a
  // }

  @examples`
    | accountTag   | contactType | smsMessage |
    | us           | personal    | aaa        |
    | uk           | company     | bbb        |
    | ca           | all         | xxx        |
  `
  run({ smsMessage }: {  smsMessage: string }) {
    debugger;
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


// [
//   {
//     key: 'EntryPoint',
//     desc: 'sss',
//     type: 'builder',
//     status: 'start',
//     time: 12312
//   },
//   {
//     key: 'EntryPoint',
//     desc: '',
//     type: 'step',
//     status: 'end',
//     time: 123123,
//   },
// ]


