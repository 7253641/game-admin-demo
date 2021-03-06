var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView, translate } from 'ra-core';
var RefreshButton = /** @class */ (function (_super) {
    __extends(RefreshButton, _super);
    function RefreshButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var _a = _this.props, refreshView = _a.refreshView, onClick = _a.onClick;
            event.preventDefault();
            refreshView();
            if (typeof onClick === 'function') {
                onClick();
            }
        };
        return _this;
    }
    RefreshButton.prototype.render = function () {
        var _a = this.props, className = _a.className, label = _a.label, refreshView = _a.refreshView, translate = _a.translate, icon = _a.icon, rest = __rest(_a, ["className", "label", "refreshView", "translate", "icon"]);
        return (React.createElement(Tooltip, { title: label && translate(label, { _: label }) },
            React.createElement(IconButton, __assign({ "aria-label": label && translate(label, { _: label }), className: className, color: "inherit", onClick: this.handleClick }, rest), icon)));
    };
    RefreshButton.propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        refreshView: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired,
        icon: PropTypes.element,
    };
    RefreshButton.defaultProps = {
        label: 'ra.action.refresh',
        icon: React.createElement(NavigationRefresh, null),
    };
    return RefreshButton;
}(Component));
var enhance = compose(connect(null, { refreshView: refreshView }), translate);
export default enhance(RefreshButton);
