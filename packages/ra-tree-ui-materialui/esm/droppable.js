import { DropTarget } from 'react-dnd';
import { DROP_TARGET_TYPE } from './constants';
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
export default DropTarget(DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect);
