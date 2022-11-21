import { logger } from '../handlers/handler';
import { InfrastructureUnknownError } from '../errors/error';

export const infrastructure = async (payload: object) => {
  try {
    logger.appendKeys({ infrastructureEvent: payload });
    throw new Error('This Error from AWS SDK');
    // return 'OK';
  } catch (err: unknown) {
    logger.appendKeys({ infrastructureError: err });
    throw new InfrastructureUnknownError(err, payload);
  }
};
