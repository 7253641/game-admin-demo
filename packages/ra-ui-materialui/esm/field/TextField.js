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
import React from 'react';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';
import { fieldPropTypes } from './types';
var TextField = function (_a) {
    var className = _a.className, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, rest = __rest(_a, ["className", "source", "record"]);
    var value = get(record, source);
    return (React.createElement(Typography, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps(rest)), value && typeof value !== 'string' ? JSON.stringify(value) : value));
};
// wat? TypeScript looses the displayName if we don't set it explicitly
TextField.displayName = 'TextField';
var EnhancedTextField = pure(TextField);
EnhancedTextField.defaultProps = {
    addLabel: true,
};
EnhancedTextField.propTypes = __assign({}, Typography.propTypes, fieldPropTypes);
EnhancedTextField.displayName = 'EnhancedTextField';
export default EnhancedTextField;
