import { Logger } from '@aws-lambda-powertools/logger';
import {
  InfrastructureUnknownError,
  UseCaseUnknownError,
} from './errors/error';

const logger = new Logger({ serviceName: 'check-power-tools-log' });

const infrastructure = async (payload: object) => {
  try {
    logger.appendKeys({ infrastructureEvent: payload });
    throw new Error('This Error from AWS SDK');
    // return 'OK';
  } catch (err: unknown) {
    logger.appendKeys({ infrastructureError: err });
    throw new InfrastructureUnknownError(err, payload);
  }
};

const useCase = async (payload: object) => {
  try {
    logger.appendKeys({ useCaseEvent: payload });
    await infrastructure(payload);
  } catch (err: unknown) {
    logger.appendKeys({ useCaseError: err });
    throw new UseCaseUnknownError(err, payload);
  }
};

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
