"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_dnd_1 = require("react-dnd");
var constants_1 = require("./constants");
var isDraggingAParent = function (props, monitor) {
    var draggedNode = monitor.getItem();
    if (!draggedNode) {
        return false;
    }
    var node = props.node;
    while (node) {
        // If the dragged node is a parent of the current node, it can't be dropped
        if (draggedNode.id === node.id) {
            return true;
        }
        node = node.parent;
    }
    return false;
};
var dropTargetSpecs = {
    drop: function (props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return props.node;
        }
        return undefined;
    },
    canDrop: function (props, monitor) {
        return !isDraggingAParent(props, monitor);
    },
};
var dropTargetConnect = function (connect, monitor) { return ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
}); };
exports.default = react_dnd_1.DropTarget(constants_1.DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect);
