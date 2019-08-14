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
import React, { Children, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { TreeController } from 'ra-tree-core';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import draggable from './draggable';
import droppable from './droppable';
import DragLayer from './DragLayer';
import DefaultDragPreview from './DragPreview';
import DefaultTreeNode from './TreeNode';
import DefaultTreeNodeContent from './TreeNodeContent';
import DefaultTreeNodeWithChildren from './TreeNodeWithChildren';
import RootDropTarget from './RootDropTarget';
export var styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
};
var sanitizeRestProps = function (_a) {
    var currentSort = _a.currentSort, defaultTitle = _a.defaultTitle, displayedFilters = _a.displayedFilters, filterValues = _a.filterValues, getTreeState = _a.getTreeState, hasBulkActions = _a.hasBulkActions, hasCreate = _a.hasCreate, hideFilter = _a.hideFilter, isLoading = _a.isLoading, loadedOnce = _a.loadedOnce, perPage = _a.perPage, selectedIds = _a.selectedIds, setFilters = _a.setFilters, setPage = _a.setPage, setPerPage = _a.setPerPage, setSelectedIds = _a.setSelectedIds, setSort = _a.setSort, showFilter = _a.showFilter, rest = __rest(_a, ["currentSort", "defaultTitle", "displayedFilters", "filterValues", "getTreeState", "hasBulkActions", "hasCreate", "hideFilter", "isLoading", "loadedOnce", "perPage", "selectedIds", "setFilters", "setPage", "setPerPage", "setSelectedIds", "setSort", "showFilter"]);
    return rest;
};
var warnAboutChildren = function () {
    return console.warn(
    // eslint-disable-line
    "You passed multiple children to the Tree component. You must either pass it a NodeView or a NodeForm component as its only child:\n\n    <Tree>\n        <NodeView>\n            <TextField source=\"name\" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    <Tree>\n        <NodeForm>\n            <TextInput source=\"name\" />\n        </NodeForm>\n    </Tree>\n\nIf you need actions on each node, use the actions prop on either the NodeView or NodeForm component:\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <EditButton />\n            <ShowButton />\n            <DeleteButton />\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeView actions={<MyNodeActions />}>\n            <TextField source=\"name\" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <SaveButton variant=\"flat\" />\n            <IgnoreFormProps>\n                <EditButton />\n                <ShowButton />\n                <DeleteButton />\n            </IgnoreFormProps>\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeForm actions={<MyNodeActions />}>\n            <TextInput source=\"name\" />\n        </NodeForm>\n    </Tree>\n");
};
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tree.prototype.componentDidMount = function () {
        var childrenCount = Children.count(this.props.children);
        if (childrenCount > 1 && process.env.NODE_ENV !== 'production') {
            warnAboutChildren();
        }
    };
    Tree.prototype.render = function () {
        var _a = this.props, allowDropOnRoot = _a.allowDropOnRoot, children = _a.children, classes = _a.classes, dragPreviewComponent = _a.dragPreviewComponent, enableDragAndDrop = _a.enableDragAndDrop, parentSource = _a.parentSource, treeNodeComponent = _a.treeNodeComponent, treeNodeWithChildrenComponent = _a.treeNodeWithChildrenComponent, treeNodeContentComponent = _a.treeNodeContentComponent, props = __rest(_a, ["allowDropOnRoot", "children", "classes", "dragPreviewComponent", "enableDragAndDrop", "parentSource", "treeNodeComponent", "treeNodeWithChildrenComponent", "treeNodeContentComponent"]);
        var Container = enableDragAndDrop
            ? DragDropContext(TouchBackend({
                enableKeyboardEvents: true,
                enableMouseEvents: true,
                enableTouchEvents: true,
            }))('div')
            : Fragment;
        var TreeNode = enableDragAndDrop
            ? droppable(treeNodeComponent)
            : treeNodeComponent;
        var TreeNodeContent = enableDragAndDrop
            ? draggable(treeNodeContentComponent)
            : treeNodeContentComponent;
        return (React.createElement(TreeController, __assign({ parentSource: parentSource }, props), function (_a) {
            var getTreeState = _a.getTreeState, tree = _a.tree, controllerProps = __rest(_a, ["getTreeState", "tree"]);
            return (React.createElement(Container, null,
                enableDragAndDrop ? (React.createElement(DragLayer, { dragPreviewComponent: dragPreviewComponent })) : null,
                React.createElement(List, { classes: {
                        root: classes.root,
                    }, dense: true, disablePadding: true },
                    enableDragAndDrop && allowDropOnRoot ? (React.createElement(RootDropTarget, { parentSource: parentSource })) : null,
                    tree.map(function (node) { return (React.createElement(TreeNode, __assign({ key: "TreeNode_" + node.id, classes: __assign({}, classes, { root: classes.node || undefined }), getTreeState: getTreeState, node: node, treeNodeComponent: TreeNode, treeNodeWithChildrenComponent: treeNodeWithChildrenComponent, treeNodeContentComponent: TreeNodeContent }, sanitizeRestProps(controllerProps)), children)); }))));
        }));
    };
    return Tree;
}(Component));
export { Tree };
Tree.propTypes = {
    allowDropOnRoot: PropTypes.bool,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object,
    enableDragAndDrop: PropTypes.bool,
    getTreeFromArray: PropTypes.func,
    parentSource: PropTypes.string,
    resource: PropTypes.string.isRequired,
    dragPreviewComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    treeNodeComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeContentComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    treeNodeWithChildrenComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
};
Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
    dragPreviewComponent: DefaultDragPreview,
    treeNodeComponent: DefaultTreeNode,
    treeNodeContentComponent: DefaultTreeNodeContent,
    treeNodeWithChildrenComponent: DefaultTreeNodeWithChildren,
};
export default withStyles(styles)(Tree);
