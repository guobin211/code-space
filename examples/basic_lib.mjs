// ===========================================================================
// es6 module
/**
 * @description
 * ```
 * Object.defineProperty(exports, "__esModule", { value: true });
 * Module {
 *   default: {},
 *   logger: {},
 * }
 * ```
 */
export const logger = {
  log: (...args) => {
    console.log('log.....');
    console.log(...args);
  },
  info: (...args) => {
    console.log('info.....');
    console.log(...args);
  },
  error: (...args) => {
    console.log('error.....');
    console.log(...args);
  },
};

export default {
  logger,
};
