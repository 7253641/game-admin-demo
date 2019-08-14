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
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
var CONTAINER_CLASS = 'treenode-content';
var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
    },
};
var sanitizeRestProps = function (_a) {
    var cancelDropOnChildren = _a.cancelDropOnChildren, crudUpdate = _a.crudUpdate, dispatchCrudUpdate = _a.dispatchCrudUpdate, getTreeState = _a.getTreeState, isDragging = _a.isDragging, onSelect = _a.onSelect, onToggleItem = _a.onToggleItem, onUnselectItems = _a.onUnselectItems, parentSource = _a.parentSource, startUndoable = _a.startUndoable, translate = _a.translate, undoable = _a.undoable, undoableDragDrop = _a.undoableDragDrop, rest = __rest(_a, ["cancelDropOnChildren", "crudUpdate", "dispatchCrudUpdate", "getTreeState", "isDragging", "onSelect", "onToggleItem", "onUnselectItems", "parentSource", "startUndoable", "translate", "undoable", "undoableDragDrop"]);
    return rest;
};
var NodeView = /** @class */ (function (_super) {
    __extends(NodeView, _super);
    function NodeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on a button does not collapse/expand a node
            // When clicking on the form (empty spaces around buttons) however, it should
            // propagate to the parent
            if (!event.target.matches("." + CONTAINER_CLASS)) {
                event.stopPropagation();
            }
        };
        return _this;
    }
    NodeView.prototype.render = function () {
        var _a = this.props, actions = _a.actions, basePath = _a.basePath, children = _a.children, classes = _a.classes, node = _a.node, resource = _a.resource, props = __rest(_a, ["actions", "basePath", "children", "classes", "node", "resource"]);
        return (React.createElement("div", __assign({ className: classNames(CONTAINER_CLASS, classes.root), onClick: this.handleClick }, sanitizeRestProps(props)),
            Children.map(children, function (field) {
                return field
                    ? cloneElement(field, {
                        basePath: field.props.basePath || basePath,
                        record: node.record,
                        resource: resource,
                    })
                    : null;
            }),
            actions &&
                cloneElement(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource,
                })));
    };
    NodeView.propTypes = {
        actions: PropTypes.node,
        basePath: PropTypes.string.isRequired,
        children: PropTypes.node,
        classes: PropTypes.object,
        node: PropTypes.object.isRequired,
        resource: PropTypes.string.isRequired,
    };
    return NodeView;
}(Component));
export { NodeView };
export default withStyles(styles)(NodeView);
