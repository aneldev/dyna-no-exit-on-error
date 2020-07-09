import { DynaNoExitOnError } from "../index";
import { describe, expect, success } from "./testValidations";
import { dynaStringify } from "dyna-stringify";

let errors: any[] = [];
let jsErrors: any[] = [];
let promiseRejections: any[] = [];

const clearErrors = (): void => {
  errors = [];
  jsErrors = [];
  promiseRejections = [];
};

const getErrorReport = () =>
  dynaStringify(
    {
      errors: errors,
      jsErrors: jsErrors,
      promiseRejections: promiseRejections,
    },
    {
      spaces: 2,
    });

const hasErrors = (): boolean => !!errors.length;

const dynaNoExitOnError = new DynaNoExitOnError({
  onError: error => errors.push(error),
  onUncaughtException: (error, origin, errorJson) => jsErrors.push(errorJson) && error && origin,
  onUncaughtRejection: (error, origin, errorJson) => promiseRejections.push(errorJson) && error && origin,
});
dynaNoExitOnError.disable();

(async () => {
  console.clear();

  describe('DynaNoExitOnError catch JS errors');
  clearErrors();

  try {
    (process as any).__notExistProperty.name;
  } catch (e) {
    success('JS error caught without dynaNoExitOnError');
  }

  dynaNoExitOnError.enable();

  expect('No errors', hasErrors(), false, getErrorReport());

  setTimeout(() => {
    (process as any).__notExistProperty.name;
  }, 5);

  await new Promise(r => setTimeout(r, 200));

  expect('Has errors after execution', hasErrors(), true, getErrorReport());

  expect('Error caught by dynaNoExitOnError', errors.length, 1, getErrorReport());
  expect('JS error caught by dynaNoExitOnError', jsErrors.length, 1, getErrorReport());
  expect('No Promise rejection caught by dynaNoExitOnError', promiseRejections.length, 0, getErrorReport());

  dynaNoExitOnError.dispose();

  try {
    (process as any).__notExistProperty.name;
  } catch (e) {
    success('JS error caught after dynaNoExitOnError.dispose');
  }

  describe('DynaNoExitOnError catch Promise rejections');
  clearErrors();
  dynaNoExitOnError.enable();

  expect('No errors, before', hasErrors(), false, getErrorReport());

  setTimeout(() => {
    Promise
      .resolve()
      .then(() => {
        throw { message: 'Custom Promise error', code: 85294324 };
      });
  }, 5);

  expect('No errors, after async start of rejection', hasErrors(), false, getErrorReport());

  await new Promise(r => setTimeout(r, 20));

  expect('Has errors, after async execution of rejection', hasErrors(), true, getErrorReport());

  expect('Error caught by dynaNoExitOnError', errors.length, 1, getErrorReport());
  expect('No JS error caught by dynaNoExitOnError', jsErrors.length, 0, getErrorReport());
  expect('Promise rejection caught by dynaNoExitOnError', promiseRejections.length, 1, getErrorReport());

  dynaNoExitOnError.disable();
})();
