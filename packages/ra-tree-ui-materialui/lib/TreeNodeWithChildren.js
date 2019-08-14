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
var List_1 = __importDefault(require("@material-ui/core/List"));
var ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
var ExpansionPanelDetails_1 = __importDefault(require("@material-ui/core/ExpansionPanelDetails"));
var ExpansionPanelSummary_1 = __importDefault(require("@material-ui/core/ExpansionPanelSummary"));
var KeyboardArrowDown_1 = __importDefault(require("@material-ui/icons/KeyboardArrowDown"));
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
        return (react_1.default.createElement(ExpansionPanel_1.default, { classes: {
                root: classes.panel,
            }, elevation: 0, expanded: isExpanded || getIsNodeExpanded(node.id), onChange: this.handleChange },
            react_1.default.createElement(ExpansionPanelSummary_1.default, { classes: {
                    content: classes.panelSummaryContent,
                    expandIcon: classes.expandIcon,
                    root: classes.panelSummary,
                    expanded: classes.panelSummaryExpanded,
                }, expandIcon: react_1.default.createElement(KeyboardArrowDown_1.default, null) },
                react_1.default.createElement(TreeNodeContent, __assign({ key: "TreeNodeContent" + node.id, basePath: basePath, node: node, resource: resource, cancelDropOnChildren: cancelDropOnChildren, classes: {
                        handle: classes.handle,
                    } }, props), children)),
            react_1.default.createElement(ExpansionPanelDetails_1.default, { classes: {
                    root: classes.panelDetails,
                } },
                react_1.default.createElement(List_1.default, { dense: true }, node.children.map(function (child) { return (react_1.default.createElement(TreeNode, __assign({ key: "TreeNode_" + child.id, basePath: basePath, classes: classes, node: child, getIsNodeExpanded: getIsNodeExpanded, resource: resource, treeNodeComponent: TreeNode, treeNodeWithChildrenComponent: treeNodeWithChildrenComponent, treeNodeContentComponent: TreeNodeContent, toggleNode: toggleNode, closeNode: closeNode, expandNode: expandNode }, props), children)); })))));
    };
    TreeNodeWithChildren.propTypes = {
        basePath: prop_types_1.default.string.isRequired,
        cancelDropOnChildren: prop_types_1.default.bool,
        children: prop_types_1.default.node,
        classes: prop_types_1.default.object,
        closeNode: prop_types_1.default.func,
        expandNode: prop_types_1.default.func,
        getIsNodeExpanded: prop_types_1.default.func,
        isExpanded: prop_types_1.default.bool,
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
    return TreeNodeWithChildren;
}(react_1.Component));
exports.TreeNodeWithChildren = TreeNodeWithChildren;
exports.default = TreeNodeWithChildren;
