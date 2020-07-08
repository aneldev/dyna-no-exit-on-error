export const describe = (testDescription: string): void => {
  console.info('TEST', testDescription);
};
export const expect = (testMessage: string, testValue: any, expectedValue: any, errorData?: any): void => {
  if (testValue === expectedValue)
    success(testMessage);
  else
    fail(testMessage, { testValue, expectedValue, errorData });
};

export const success = (testMessage: string, data?: any): void => {
  console.log(...['   ', 'Test Success:', testMessage, data].filter(Boolean));
};

export const fail = (testMessage: string, data?: any): void => {
  console.error(...['   ', 'Test Failed:', testMessage, data].filter(Boolean));
  process.exit(303);
};
