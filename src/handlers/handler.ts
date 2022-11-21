import { logger } from '../utils/logger';
import { useCase } from '../use-cases/use-case';

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
