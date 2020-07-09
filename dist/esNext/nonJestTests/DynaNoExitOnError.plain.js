var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DynaNoExitOnError } from "../index";
import { describe, expect, success } from "./testValidations";
import { dynaStringify } from "dyna-stringify";
var errors = [];
var jsErrors = [];
var promiseRejections = [];
var clearErrors = function () {
    errors = [];
    jsErrors = [];
    promiseRejections = [];
};
var getErrorReport = function () {
    return dynaStringify({
        errors: errors,
        jsErrors: jsErrors,
        promiseRejections: promiseRejections,
    }, {
        spaces: 2,
    });
};
var hasErrors = function () { return !!errors.length; };
var dynaNoExitOnError = new DynaNoExitOnError({
    onError: function (error) { return errors.push(error); },
    onUncaughtException: function (error, origin, errorJson) { return jsErrors.push(errorJson) && error && origin; },
    onUncaughtRejection: function (error, origin, errorJson) { return promiseRejections.push(errorJson) && error && origin; },
});
dynaNoExitOnError.disable();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.clear();
                describe('DynaNoExitOnError catch JS errors');
                clearErrors();
                try {
                    process.__notExistProperty.name;
                }
                catch (e) {
                    success('JS error caught without dynaNoExitOnError');
                }
                dynaNoExitOnError.enable();
                expect('No errors', hasErrors(), false, getErrorReport());
                setTimeout(function () {
                    process.__notExistProperty.name;
                }, 5);
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 200); })];
            case 1:
                _a.sent();
                expect('Has errors after execution', hasErrors(), true, getErrorReport());
                expect('Error caught by dynaNoExitOnError', errors.length, 1, getErrorReport());
                expect('JS error caught by dynaNoExitOnError', jsErrors.length, 1, getErrorReport());
                expect('No Promise rejection caught by dynaNoExitOnError', promiseRejections.length, 0, getErrorReport());
                dynaNoExitOnError.dispose();
                try {
                    process.__notExistProperty.name;
                }
                catch (e) {
                    success('JS error caught after dynaNoExitOnError.dispose');
                }
                describe('DynaNoExitOnError catch Promise rejections');
                clearErrors();
                dynaNoExitOnError.enable();
                expect('No errors, before', hasErrors(), false, getErrorReport());
                setTimeout(function () {
                    Promise
                        .resolve()
                        .then(function () {
                        throw { message: 'Custom Promise error', code: 85294324 };
                    });
                }, 5);
                expect('No errors, after async start of rejection', hasErrors(), false, getErrorReport());
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 20); })];
            case 2:
                _a.sent();
                expect('Has errors, after async execution of rejection', hasErrors(), true, getErrorReport());
                expect('Error caught by dynaNoExitOnError', errors.length, 1, getErrorReport());
                expect('No JS error caught by dynaNoExitOnError', jsErrors.length, 0, getErrorReport());
                expect('Promise rejection caught by dynaNoExitOnError', promiseRejections.length, 1, getErrorReport());
                dynaNoExitOnError.disable();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=DynaNoExitOnError.plain.js.map