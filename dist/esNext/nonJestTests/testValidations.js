export var describe = function (testDescription) {
    console.info('TEST', testDescription);
};
export var expect = function (testMessage, testValue, expectedValue, errorData) {
    if (testValue === expectedValue)
        success(testMessage);
    else
        fail(testMessage, { testValue: testValue, expectedValue: expectedValue, errorData: errorData });
};
export var success = function (testMessage, data) {
    console.log.apply(console, ['   ', 'Test Success:', testMessage, data].filter(Boolean));
};
export var fail = function (testMessage, data) {
    console.error.apply(console, ['   ', 'Test Failed:', testMessage, data].filter(Boolean));
    process.exit(303);
};
//# sourceMappingURL=testValidations.js.map