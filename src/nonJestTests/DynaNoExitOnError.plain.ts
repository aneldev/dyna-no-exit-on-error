import { DynaNoExitOnError } from "../index";
import { expect, success } from "./testValidations";

(async () => {

  const errors: any[] = [];

  try {
    (process as any).__notExistProperty.name;
  } catch (e) {
    success('JS error caught without dynaNoExitOnError');
  }

  const dynaNoExitOnError = new DynaNoExitOnError({
    onError: error => errors.push(error),
  });

  setTimeout(() => {
    (process as any).__notExistProperty.name;
  }, 5);

  await new Promise(r => setTimeout(r, 20));
  expect('Error caught by  dynaNoExitOnError', errors.length, 1);

  dynaNoExitOnError.dispose();
})();
