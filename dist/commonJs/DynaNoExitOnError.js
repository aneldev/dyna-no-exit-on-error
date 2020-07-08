"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dyna_stringify_1 = require("dyna-stringify");
var isNode_1 = require("./isNode");
var DynaNoExitOnError = /** @class */ (function () {
    function DynaNoExitOnError(_config) {
        var _this = this;
        this._config = _config;
        this._handleUncaughtException = function (error, origin) {
            var _a = _this._config, onUncaughtException = _a.onUncaughtException, onError = _a.onError;
            var errorJson = _this._buildErrorJson(error, origin);
            onUncaughtException && onUncaughtException(error, origin, errorJson);
            onError && onError(error, origin, errorJson);
        };
        this._handleUncaughtRejection = function (error, promise) {
            promise; // 4ts
            var _a = _this._config, onUncaughtRejection = _a.onUncaughtRejection, onError = _a.onError;
            var errorJson = _this._buildErrorJson(error, 'Promise');
            onUncaughtRejection && onUncaughtRejection(error, 'Promise', errorJson);
            onError && onError(error, 'Promise', errorJson);
        };
        if (Object.keys(this._config).length === 0)
            console.warn("DynaNoExitOnError called with empty configuration, all uncaught exceptions and rejections will be swallowed! Help how to configure it: http://github.com/aneldev/dyna-no-exit-on-error");
        this.enable();
    }
    DynaNoExitOnError.prototype.enable = function () {
        if (!isNode_1.isNode)
            return;
        process.on('uncaughtException', this._handleUncaughtException);
        process.on('unhandledRejection', this._handleUncaughtRejection);
    };
    DynaNoExitOnError.prototype.disable = function () {
        if (!isNode_1.isNode)
            return;
        process.off('uncaughtException', this._handleUncaughtException);
        process.off('unhandledRejection', this._handleUncaughtRejection);
    };
    DynaNoExitOnError.prototype.dispose = function () {
        this.disable();
    };
    DynaNoExitOnError.prototype._buildErrorJson = function (error, origin) {
        var dynaNoExitOnErrorInfo = {
            origin: origin,
        };
        var t1 = dyna_stringify_1.dynaStringify(error);
        if (t1 !== '{}')
            return __assign(__assign({}, JSON.parse(dyna_stringify_1.dynaStringify(error))), { dynaNoExitOnErrorInfo: dynaNoExitOnErrorInfo });
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
            hasOwnProperty: error.hasOwnProperty && error.hasOwnProperty(),
            fullMessage: error.toString(),
            dynaNoExitOnErrorInfo: dynaNoExitOnErrorInfo,
        };
    };
    return DynaNoExitOnError;
}());
exports.DynaNoExitOnError = DynaNoExitOnError;
//# sourceMappingURL=DynaNoExitOnError.js.map