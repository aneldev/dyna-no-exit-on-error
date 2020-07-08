"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describe = function (testDescription) {
    console.info('TEST', testDescription);
};
exports.expect = function (testMessage, testValue, expectedValue, errorData) {
    if (testValue === expectedValue)
        exports.success(testMessage);
    else
        exports.fail(testMessage, { testValue: testValue, expectedValue: expectedValue, errorData: errorData });
};
exports.success = function (testMessage, data) {
    console.log.apply(console, ['   ', 'Test Success:', testMessage, data].filter(Boolean));
};
exports.fail = function (testMessage, data) {
    console.error.apply(console, ['   ', 'Test Failed:', testMessage, data].filter(Boolean));
    process.exit(303);
};
//# sourceMappingURL=testValidations.js.map