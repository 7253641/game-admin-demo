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
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconGetApp from '@material-ui/icons/GetApp';
import { translate } from 'ra-core';
import { DROP_TARGET_TYPE } from './constants';
var styles = function (theme) { return ({
    root: {
        paddingLeft: theme.spacing.unit * 6,
    },
    text: {
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    hover: {
        backgroundColor: theme.palette.action.active,
    },
}); };
var RootDropTarget = /** @class */ (function (_super) {
    __extends(RootDropTarget, _super);
    function RootDropTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootDropTarget.prototype.shouldComponentUpdate = function (nextProps) {
        return (this.props.canDrop !== nextProps.canDrop ||
            this.props.isOverCurrent !== nextProps.isOverCurrent);
    };
    RootDropTarget.prototype.render = function () {
        var _a;
        var _b = this.props, canDrop = _b.canDrop, classes = _b.classes, connectDropTarget = _b.connectDropTarget, isOverCurrent = _b.isOverCurrent, translate = _b.translate;
        return (React.createElement(ListItem, { className: classNames(classes.root, (_a = {},
                _a[classes.hover] = canDrop && isOverCurrent,
                _a)), disabled: !canDrop },
            React.createElement(IconGetApp, null),
            connectDropTarget(React.createElement("div", null,
                React.createElement(Typography, { className: classes.text }, translate('ra.tree.root_target'))))));
    };
    RootDropTarget.propTypes = {
        canDrop: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isOverCurrent: PropTypes.bool,
        translate: PropTypes.func.isRequired,
    };
    return RootDropTarget;
}(Component));
var dropTargetSpecs = {
    drop: function (props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return { id: null, record: { id: null } };
        }
        return undefined;
    },
    canDrop: function (props, monitor) {
        var item = monitor.getItem();
        return !!item.parent;
    },
};
var dropTargetConnect = function (connect, monitor) { return ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    item: monitor.getItem(),
}); };
export default compose(DropTarget(DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect), translate, withStyles(styles))(RootDropTarget);
