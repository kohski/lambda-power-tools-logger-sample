import { Logger } from '@aws-lambda-powertools/logger';
import { useCase } from './use-cases/use-case';

export const logger = new Logger({ serviceName: 'check-power-tools-log' });

const handler = async (event: object) => {
  try {
    logger.appendKeys({ handlerEvent: event });
    await useCase(event);
    return 200;
  } catch (err) {
    logger.error('Fatal Error', { err });
    return 500;
  }
};

handler({ name: 'test-handler-invoke' }).then((res) => {
  return res;
});
