// import { Logger } from '@aws-lambda-powertools/logger';
import { logger } from '../handlers/handler';
import { UseCaseUnknownError } from '../errors/error';
import { infrastructure } from '../infrastructures/infrastructures';

// const logger = new Logger({ serviceName: 'check-power-tools-log' });

export const useCase = async (payload: object) => {
  try {
    logger.appendKeys({ useCaseEvent: payload });
    await infrastructure(payload);
  } catch (err: unknown) {
    logger.appendKeys({ useCaseError: err });
    throw new UseCaseUnknownError(err, payload);
  }
};
