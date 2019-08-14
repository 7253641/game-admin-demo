"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var List_1 = __importDefault(require("@material-ui/core/List"));
var ra_tree_core_1 = require("ra-tree-core");
var react_dnd_1 = require("react-dnd");
var react_dnd_touch_backend_1 = __importDefault(require("react-dnd-touch-backend"));
var draggable_1 = __importDefault(require("./draggable"));
var droppable_1 = __importDefault(require("./droppable"));
var DragLayer_1 = __importDefault(require("./DragLayer"));
var DragPreview_1 = __importDefault(require("./DragPreview"));
var TreeNode_1 = __importDefault(require("./TreeNode"));
var TreeNodeContent_1 = __importDefault(require("./TreeNodeContent"));
var TreeNodeWithChildren_1 = __importDefault(require("./TreeNodeWithChildren"));
var RootDropTarget_1 = __importDefault(require("./RootDropTarget"));
exports.styles = {
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
        var childrenCount = react_1.Children.count(this.props.children);
        if (childrenCount > 1 && process.env.NODE_ENV !== 'production') {
            warnAboutChildren();
        }
    };
    Tree.prototype.render = function () {
        var _a = this.props, allowDropOnRoot = _a.allowDropOnRoot, children = _a.children, classes = _a.classes, dragPreviewComponent = _a.dragPreviewComponent, enableDragAndDrop = _a.enableDragAndDrop, parentSource = _a.parentSource, treeNodeComponent = _a.treeNodeComponent, treeNodeWithChildrenComponent = _a.treeNodeWithChildrenComponent, treeNodeContentComponent = _a.treeNodeContentComponent, props = __rest(_a, ["allowDropOnRoot", "children", "classes", "dragPreviewComponent", "enableDragAndDrop", "parentSource", "treeNodeComponent", "treeNodeWithChildrenComponent", "treeNodeContentComponent"]);
        var Container = enableDragAndDrop
            ? react_dnd_1.DragDropContext(react_dnd_touch_backend_1.default({
                enableKeyboardEvents: true,
                enableMouseEvents: true,
                enableTouchEvents: true,
            }))('div')
            : react_1.Fragment;
        var TreeNode = enableDragAndDrop
            ? droppable_1.default(treeNodeComponent)
            : treeNodeComponent;
        var TreeNodeContent = enableDragAndDrop
            ? draggable_1.default(treeNodeContentComponent)
            : treeNodeContentComponent;
        return (react_1.default.createElement(ra_tree_core_1.TreeController, __assign({ parentSource: parentSource }, props), function (_a) {
            var getTreeState = _a.getTreeState, tree = _a.tree, controllerProps = __rest(_a, ["getTreeState", "tree"]);
            return (react_1.default.createElement(Container, null,
                enableDragAndDrop ? (react_1.default.createElement(DragLayer_1.default, { dragPreviewComponent: dragPreviewComponent })) : null,
                react_1.default.createElement(List_1.default, { classes: {
                        root: classes.root,
                    }, dense: true, disablePadding: true },
                    enableDragAndDrop && allowDropOnRoot ? (react_1.default.createElement(RootDropTarget_1.default, { parentSource: parentSource })) : null,
                    tree.map(function (node) { return (react_1.default.createElement(TreeNode, __assign({ key: "TreeNode_" + node.id, classes: __assign({}, classes, { root: classes.node || undefined }), getTreeState: getTreeState, node: node, treeNodeComponent: TreeNode, treeNodeWithChildrenComponent: treeNodeWithChildrenComponent, treeNodeContentComponent: TreeNodeContent }, sanitizeRestProps(controllerProps)), children)); }))));
        }));
    };
    return Tree;
}(react_1.Component));
exports.Tree = Tree;
Tree.propTypes = {
    allowDropOnRoot: prop_types_1.default.bool,
    basePath: prop_types_1.default.string.isRequired,
    children: prop_types_1.default.node,
    classes: prop_types_1.default.object,
    enableDragAndDrop: prop_types_1.default.bool,
    getTreeFromArray: prop_types_1.default.func,
    parentSource: prop_types_1.default.string,
    resource: prop_types_1.default.string.isRequired,
    dragPreviewComponent: prop_types_1.default.oneOfType([
        prop_types_1.default.element,
        prop_types_1.default.func,
    ]),
    treeNodeComponent: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.func]),
    treeNodeContentComponent: prop_types_1.default.oneOfType([
        prop_types_1.default.element,
        prop_types_1.default.func,
    ]),
    treeNodeWithChildrenComponent: prop_types_1.default.oneOfType([
        prop_types_1.default.element,
        prop_types_1.default.func,
    ]),
};
Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
    dragPreviewComponent: DragPreview_1.default,
    treeNodeComponent: TreeNode_1.default,
    treeNodeContentComponent: TreeNodeContent_1.default,
    treeNodeWithChildrenComponent: TreeNodeWithChildren_1.default,
};
exports.default = styles_1.withStyles(exports.styles)(Tree);
