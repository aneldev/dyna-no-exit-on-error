import "jest";
import { DynaNoExitOnError } from "../../src";

describe('buildErrorJSON', () => {
  it('builds js native errors', async () => {
      try {
        (process as any).__notExistProperty.name;
      } catch (e) {
        expect(DynaNoExitOnError._buildErrorJson(e, 'origin')).toMatchSnapshot(true);
      }
  });
  it('builds new Error', async () => {
    expect(DynaNoExitOnError._buildErrorJson(new Error('Custom new error'), 'origin')).toMatchSnapshot(true);
  });
  it('builds object Errors', async () => {
    expect(DynaNoExitOnError._buildErrorJson({message: 'Custom object error'}, 'origin')).toMatchSnapshot(true);
  });
});

