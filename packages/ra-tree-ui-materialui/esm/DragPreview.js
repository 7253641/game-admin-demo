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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
var styles = function (theme) { return ({
    item: {
        alignItems: 'center',
        backgroundColor: theme.palette.action.active,
        display: 'inline-flex',
        height: 72,
        minWidth: 72,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 4,
    },
}); };
var DragPreview = /** @class */ (function (_super) {
    __extends(DragPreview, _super);
    function DragPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragPreview.prototype.shouldComponentUpdate = function () {
        return false;
    };
    DragPreview.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, classes = _a.classes, node = _a.node, style = _a.style, translate = _a.translate;
        return (React.createElement("div", { className: className || classes.item, style: style }, children
            ? typeof children === 'function'
                ? children({ node: node, translate: translate })
                : children
            : translate('ra.tree.drag_preview', {
                id: node.id,
                smart_count: node.children.length,
            })));
    };
    return DragPreview;
}(Component));
DragPreview.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    classes: PropTypes.object,
    node: PropTypes.object,
    style: PropTypes.object,
    translate: PropTypes.func.isRequired,
};
export default compose(translate, withStyles(styles))(DragPreview);
