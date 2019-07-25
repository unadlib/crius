import { Plugins } from 'crius-test';

interface Log {
  key: string;
  desc: string|undefined|null;
  type: 'builder'|'step';
  status: 'start'|'end';
  time: number;
  target: any;
}

const logger: Plugins<{ desc?: string }, {__logger?: Log[]}> = {
  beforeEach(props, context, step) {
    if (!Array.isArray(context.__logger)) context.__logger = [];
    context.__logger.push({
      key: typeof step === 'object' ?  step.constructor.name: step.name,
      desc: props.desc,
      type: 'builder',
      status: 'start',
      time: Date.now(),
      target: step,
    });
  },
  afterEach(props, context, step) {
    if (!Array.isArray(context.__logger)) context.__logger = [];
    context.__logger.push({
      key: typeof step === 'object' ?  step.constructor.name: step.name,
      desc: props.desc,
      type: 'builder',
      status: 'end',
      time: Date.now(),
      target: step,
    });
  }
}

export {
  logger as default,
}
