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
var DragHandle_1 = __importDefault(require("@material-ui/icons/DragHandle"));
var TreeNodeContent = /** @class */ (function (_super) {
    __extends(TreeNodeContent, _super);
    function TreeNodeContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeNodeContent.prototype.render = function () {
        var _a = this.props, children = _a.children, classes = _a.classes, connectDragPreview = _a.connectDragPreview, connectDragSource = _a.connectDragSource, Container = _a.containerElement, expandNode = _a.expandNode, submit = _a.submit, isLeaf = _a.isLeaf, node = _a.node, props = __rest(_a, ["children", "classes", "connectDragPreview", "connectDragSource", "containerElement", "expandNode", "submit", "isLeaf", "node"]);
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.cloneElement(react_1.Children.only(children), __assign({ node: node }, props)),
            connectDragPreview &&
                connectDragPreview(react_1.default.createElement("span", null), {
                    // IE fallback: specify that we'd rather screenshot the node
                    // when it already knows it's being dragged so we can hide it with CSS.
                    captureDraggingState: true,
                }),
            connectDragSource &&
                connectDragSource(react_1.default.createElement("div", { className: classes.handle },
                    react_1.default.createElement(DragHandle_1.default, null)))));
    };
    TreeNodeContent.propTypes = {
        basePath: prop_types_1.default.string.isRequired,
        cancelDropOnChildren: prop_types_1.default.bool,
        connectDragPreview: prop_types_1.default.func,
        connectDragSource: prop_types_1.default.func,
        containerElement: prop_types_1.default.oneOfType([
            prop_types_1.default.element,
            prop_types_1.default.func,
            prop_types_1.default.string,
        ]),
        children: prop_types_1.default.node,
        classes: prop_types_1.default.object.isRequired,
        expandNode: prop_types_1.default.func,
        isLeaf: prop_types_1.default.bool,
        node: prop_types_1.default.object.isRequired,
        resource: prop_types_1.default.string.isRequired,
        submit: prop_types_1.default.func,
    };
    TreeNodeContent.defaultProps = {
        containerElement: 'div',
    };
    return TreeNodeContent;
}(react_1.Component));
exports.default = TreeNodeContent;
