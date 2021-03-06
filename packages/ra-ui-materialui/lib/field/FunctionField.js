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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pure_1 = __importDefault(require("recompose/pure"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var types_1 = require("./types");
/**
 * @example
 * <FunctionField source="last_name" label="Name" render={record => `${record.first_name} ${record.last_name}`} />
 */
var FunctionField = function (_a) {
    var className = _a.className, _b = _a.record, record = _b === void 0 ? {} : _b, source = _a.source, render = _a.render, rest = __rest(_a, ["className", "record", "source", "render"]);
    return record ? (react_1.default.createElement(Typography_1.default, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps_1.default(rest)), render(record, source))) : null;
};
var EnhancedFunctionField = pure_1.default(FunctionField);
EnhancedFunctionField.defaultProps = {
    addLabel: true,
};
EnhancedFunctionField.propTypes = __assign({}, Typography_1.default.propTypes, types_1.fieldPropTypes);
EnhancedFunctionField.displayName = 'EnhancedFunctionField';
exports.default = EnhancedFunctionField;
