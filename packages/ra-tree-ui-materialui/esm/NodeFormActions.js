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
import React from 'react';
import { SaveButton } from 'ra-ui-materialui';
import NodeActions from './NodeActions';
var NodeFormActions = function (props) { return (React.createElement(NodeActions, __assign({}, props),
    React.createElement(SaveButton, { variant: "flat" }))); };
export default NodeFormActions;
