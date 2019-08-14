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
import React, { cloneElement, Children, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconDragHandle from '@material-ui/icons/DragHandle';
var TreeNodeContent = /** @class */ (function (_super) {
    __extends(TreeNodeContent, _super);
    function TreeNodeContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeNodeContent.prototype.render = function () {
        var _a = this.props, children = _a.children, classes = _a.classes, connectDragPreview = _a.connectDragPreview, connectDragSource = _a.connectDragSource, Container = _a.containerElement, expandNode = _a.expandNode, submit = _a.submit, isLeaf = _a.isLeaf, node = _a.node, props = __rest(_a, ["children", "classes", "connectDragPreview", "connectDragSource", "containerElement", "expandNode", "submit", "isLeaf", "node"]);
        return (React.createElement(Fragment, null,
            cloneElement(Children.only(children), __assign({ node: node }, props)),
            connectDragPreview &&
                connectDragPreview(React.createElement("span", null), {
                    // IE fallback: specify that we'd rather screenshot the node
                    // when it already knows it's being dragged so we can hide it with CSS.
                    captureDraggingState: true,
                }),
            connectDragSource &&
                connectDragSource(React.createElement("div", { className: classes.handle },
                    React.createElement(IconDragHandle, null)))));
    };
    TreeNodeContent.propTypes = {
        basePath: PropTypes.string.isRequired,
        cancelDropOnChildren: PropTypes.bool,
        connectDragPreview: PropTypes.func,
        connectDragSource: PropTypes.func,
        containerElement: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
            PropTypes.string,
        ]),
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
        expandNode: PropTypes.func,
        isLeaf: PropTypes.bool,
        node: PropTypes.object.isRequired,
        resource: PropTypes.string.isRequired,
        submit: PropTypes.func,
    };
    TreeNodeContent.defaultProps = {
        containerElement: 'div',
    };
    return TreeNodeContent;
}(Component));
export default TreeNodeContent;
