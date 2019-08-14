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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ra_ui_materialui_1 = require("ra-ui-materialui");
var NodeActions_1 = __importDefault(require("./NodeActions"));
var NodeFormActions = function (props) { return (react_1.default.createElement(NodeActions_1.default, __assign({}, props),
    react_1.default.createElement(ra_ui_materialui_1.SaveButton, { variant: "flat" }))); };
exports.default = NodeFormActions;
