"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.success = exports.expect = void 0;
exports.expect = function (testMessage, testValue, expectedValue) {
    if (testValue === expectedValue)
        exports.success(testMessage);
    else
        exports.fail(testMessage, { testValue: testValue, expectedValue: expectedValue });
};
exports.success = function (testMessage, data) {
    console.log.apply(console, ['Test Success:', testMessage, data].filter(Boolean));
};
exports.fail = function (testMessage, data) {
    console.error.apply(console, ['Test Failed:', testMessage, data].filter(Boolean));
    process.exit(303);
};
//# sourceMappingURL=testValidations.js.map