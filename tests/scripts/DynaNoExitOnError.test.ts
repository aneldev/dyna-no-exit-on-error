import "jest";
// import { DynaNoExitOnError } from "../../src/DynaNoExitOnError";

describe('DynaNoExitOnError test', () => {
  it('DynaNoExitOnError catches the errors', async () => {
      try {
        (process as any).__notExistProperty.name;
      } catch (e) {
        expect(e instanceof Error).toBe(true);
      }
  });
});

