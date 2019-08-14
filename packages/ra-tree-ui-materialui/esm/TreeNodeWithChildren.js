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
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
var TreeNodeWithChildren = /** @class */ (function (_super) {
    __extends(TreeNodeWithChildren, _super);
    function TreeNodeWithChildren() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function () {
            var _a = _this.props, toggleNode = _a.toggleNode, node = _a.node;
            toggleNode(node.id);
        };
        return _this;
    }
    TreeNodeWithChildren.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, cancelDropOnChildren = _a.cancelDropOnChildren, children = _a.children, classes = _a.classes, closeNode = _a.closeNode, expandNode = _a.expandNode, getIsNodeExpanded = _a.getIsNodeExpanded, isExpanded = _a.isExpanded, node = _a.node, resource = _a.resource, toggleNode = _a.toggleNode, TreeNode = _a.treeNodeComponent, treeNodeWithChildrenComponent = _a.treeNodeWithChildrenComponent, TreeNodeContent = _a.treeNodeContentComponent, props = __rest(_a, ["basePath", "cancelDropOnChildren", "children", "classes", "closeNode", "expandNode", "getIsNodeExpanded", "isExpanded", "node", "resource", "toggleNode", "treeNodeComponent", "treeNodeWithChildrenComponent", "treeNodeContentComponent"]);
        return (React.createElement(ExpansionPanel, { classes: {
                root: classes.panel,
            }, elevation: 0, expanded: isExpanded || getIsNodeExpanded(node.id), onChange: this.handleChange },
            React.createElement(ExpansionPanelSummary, { classes: {
                    content: classes.panelSummaryContent,
                    expandIcon: classes.expandIcon,
                    root: classes.panelSummary,
                    expanded: classes.panelSummaryExpanded,
                }, expandIcon: React.createElement(KeyboardArrowDown, null) },
                React.createElement(TreeNodeContent, __assign({ key: "TreeNodeContent" + node.id, basePath: basePath, node: node, resource: resource, cancelDropOnChildren: cancelDropOnChildren, classes: {
                        handle: classes.handle,
                    } }, props), children)),
            React.createElement(ExpansionPanelDetails, { classes: {
                    root: classes.panelDetails,
                } },
                React.createElement(List, { dense: true }, node.children.map(function (child) { return (React.createElement(TreeNode, __assign({ key: "TreeNode_" + child.id, basePath: basePath, classes: classes, node: child, getIsNodeExpanded: getIsNodeExpanded, resource: resource, treeNodeComponent: TreeNode, treeNodeWithChildrenComponent: treeNodeWithChildrenComponent, treeNodeContentComponent: TreeNodeContent, toggleNode: toggleNode, closeNode: closeNode, expandNode: expandNode }, props), children)); })))));
    };
    TreeNodeWithChildren.propTypes = {
        basePath: PropTypes.string.isRequired,
        cancelDropOnChildren: PropTypes.bool,
        children: PropTypes.node,
        classes: PropTypes.object,
        closeNode: PropTypes.func,
        expandNode: PropTypes.func,
        getIsNodeExpanded: PropTypes.func,
        isExpanded: PropTypes.bool,
        node: PropTypes.object.isRequired,
        resource: PropTypes.string.isRequired,
        toggleNode: PropTypes.func,
        treeNodeComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]),
        treeNodeContentComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]).isRequired,
        treeNodeWithChildrenComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]),
    };
    return TreeNodeWithChildren;
}(Component));
export { TreeNodeWithChildren };
export default TreeNodeWithChildren;
