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
var classnames_1 = __importDefault(require("classnames"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var styles_1 = require("@material-ui/core/styles");
var styles = function (theme) { return ({
    expandIcon: {
        margin: 0,
        left: -theme.spacing.unit * 6,
        right: 'auto' /* fix for material-ui 3 */,
    },
    root: {
        alignItems: 'baseline',
        display: 'flex',
        padding: 0,
        flexGrow: 1,
    },
    node: {
        alignItems: 'baseline',
        display: 'flex',
        padding: 0,
        flexGrow: 1,
        paddingLeft: theme.spacing.unit * 6,
    },
    leaf: {
        display: 'flex',
        flexGrow: 1,
        margin: 0,
        padding: 0,
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 4,
        position: 'relative',
    },
    panel: {
        background: 'transparent',
        display: 'block',
        flexGrow: 1,
        margin: 0,
    },
    panelDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
    },
    panelSummary: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        padding: 0,
    },
    panelSummaryExpanded: {
        margin: 0,
    },
    panelSummaryContent: {
        alignItems: 'center',
        margin: 0,
        // JSS notation to reference another class (here panelSummaryExpanded)
        '&$panelSummaryExpanded': {
            margin: 0,
        },
    },
    handle: {
        cursor: 'drag',
        alignItems: 'center',
        display: 'flex',
        marginRight: theme.spacing.unit * 2,
    },
    draggingOver: {
        background: theme.palette.action.hover,
    },
}); };
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDrop = function (event) {
            if (_this.props.isOver && _this.props.canDrop) {
                event.persit();
                event.preventDefault();
            }
        };
        return _this;
    }
    TreeNode.prototype.render = function () {
        var _a;
        var _b = this.props, basePath = _b.basePath, canDrop = _b.canDrop, children = _b.children, classes = _b.classes, closeNode = _b.closeNode, connectDropTarget = _b.connectDropTarget, expandNode = _b.expandNode, getIsNodeExpanded = _b.getIsNodeExpanded, isOver = _b.isOver, isOverCurrent = _b.isOverCurrent, itemType = _b.itemType, node = _b.node, resource = _b.resource, treeNodeComponent = _b.treeNodeComponent, TreeNodeWithChildren = _b.treeNodeWithChildrenComponent, TreeNodeContent = _b.treeNodeContentComponent, toggleNode = _b.toggleNode, props = __rest(_b, ["basePath", "canDrop", "children", "classes", "closeNode", "connectDropTarget", "expandNode", "getIsNodeExpanded", "isOver", "isOverCurrent", "itemType", "node", "resource", "treeNodeComponent", "treeNodeWithChildrenComponent", "treeNodeContentComponent", "toggleNode"]);
        return connectDropTarget(react_1.default.createElement("div", { className: classes.root },
            react_1.default.createElement(ListItem_1.default, { button: true, classes: {
                    root: classnames_1.default((_a = {},
                        _a[classes.node] = node.children.length > 0,
                        _a[classes.leaf] = node.children.length === 0,
                        _a[classes.draggingOver] = isOverCurrent,
                        _a)),
                }, dense: true, disableGutters: true }, node.children.length > 0 ? (react_1.default.createElement(TreeNodeWithChildren, __assign({ key: "TreeNodeWithChildren" + node.id, basePath: basePath, cancelDropOnChildren: !!itemType, classes: classes, closeNode: closeNode, expandNode: expandNode, getIsNodeExpanded: getIsNodeExpanded, 
                /*
                Override the isExpanded prop managed through redux on hover.
                Set it to undefined when not hovering to fall back to redux state
                so that it stay expanded if it was before
            */
                isExpanded: isOver && canDrop ? true : undefined, node: node, resource: resource, treeNodeComponent: treeNodeComponent, treeNodeWithChildrenComponent: TreeNodeWithChildren, treeNodeContentComponent: TreeNodeContent, toggleNode: toggleNode }, props), children)) : (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(TreeNodeContent, __assign({ key: "TreeNodeContent_" + node.id, basePath: basePath, node: node, resource: resource, isLeaf: true, cancelDropOnChildren: !!itemType, onDrop: this.handleDrop, classes: {
                        handle: classes.handle,
                    } }, props), children))))));
    };
    TreeNode.propTypes = {
        basePath: prop_types_1.default.string.isRequired,
        canDrop: prop_types_1.default.bool,
        children: prop_types_1.default.node,
        classes: prop_types_1.default.object,
        closeNode: prop_types_1.default.func,
        connectDropTarget: prop_types_1.default.func,
        expandNode: prop_types_1.default.func,
        getIsNodeExpanded: prop_types_1.default.func,
        isOver: prop_types_1.default.bool,
        isOverCurrent: prop_types_1.default.bool,
        itemType: prop_types_1.default.string,
        node: prop_types_1.default.object.isRequired,
        resource: prop_types_1.default.string.isRequired,
        toggleNode: prop_types_1.default.func,
        treeNodeComponent: prop_types_1.default.oneOfType([
            prop_types_1.default.element,
            prop_types_1.default.func,
        ]),
        treeNodeContentComponent: prop_types_1.default.oneOfType([
            prop_types_1.default.element,
            prop_types_1.default.func,
        ]).isRequired,
        treeNodeWithChildrenComponent: prop_types_1.default.oneOfType([
            prop_types_1.default.element,
            prop_types_1.default.func,
        ]),
    };
    TreeNode.defaultProps = {
        connectDropTarget: function (target) { return target; },
    };
    return TreeNode;
}(react_1.Component));
exports.default = styles_1.withStyles(styles)(TreeNode);
