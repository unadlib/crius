import fs from 'fs';
import path from 'path';
import { Plugins } from 'crius-test';

interface Log {
  key: string;
  desc: string|undefined|null;
  type: 'builder'|'step';
  status: 'start'|'end';
  time: number;
  // target: any;
}

interface Config {
  path: string;
}

const logger = (config?: Config): Plugins<{ desc?: string }, {__logger?: Log[]}> => {
  return {
    beforeEach(props, context, step) {
      if (!Array.isArray(context.__logger)) context.__logger = [];
      const key = typeof step === 'object' ?  step.constructor.name: step.name;
      context.__logger.push({
        key,
        desc: props.desc,
        type: (step as any).__isBuilder ? 'builder' : 'step',
        status: 'start',
        time: Date.now(),
        // target: step,
      });
    },
    afterEach(props, context, step) {
      if (!Array.isArray(context.__logger)) context.__logger = [];
      const key = typeof step === 'object' ?  step.constructor.name: step.name;
      context.__logger.push({
        key,
        desc: props.desc,
        type: (step as any).__isBuilder ? 'builder' : 'step',
        status: 'end',
        time: Date.now(),
        // target: step,
      });
      if (
        typeof config !== 'undefined' &&
        config !== null &&
        typeof  config.path === 'string' &&
        key === 'Scenario'
      ) {
        const file = path.join(process.cwd(), config.path, `${context.__logger[0].key}.json`)
        fs.writeFileSync(file, JSON.stringify(context.__logger, null, 2), 'ascii');
      }
    }
  }
}  

export {
  logger as default,
}
