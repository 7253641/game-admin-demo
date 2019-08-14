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
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { crudUpdate as crudUpdateAction, startUndoable as startUndoableAction, } from 'ra-core';
import { expandNode as expandNodeAction } from 'ra-tree-core';
import { DROP_TARGET_TYPE } from './constants';
var dragSourceSpecs = {
    beginDrag: function (props) {
        return props.node;
    },
    endDrag: function (_a, monitor) {
        var basePath = _a.basePath, dispatchCrudUpdate = _a.dispatchCrudUpdate, expandNode = _a.expandNode, node = _a.node, parentSource = _a.parentSource, resource = _a.resource, startUndoable = _a.startUndoable, _b = _a.undoableDragDrop, undoableDragDrop = _b === void 0 ? true : _b;
        var _c, _d;
        if (!monitor.didDrop()) {
            return;
        }
        var droppedOnNode = monitor.getDropResult();
        if (typeof droppedOnNode.id === 'undefined' ||
            droppedOnNode.id === node.record[parentSource]) {
            return;
        }
        // Ensure the node on which the dragged node has been dropped is expanded along with its parents
        // to avoid the dropped node to disappear
        var nodeToExpand = droppedOnNode;
        expandNode(resource, nodeToExpand.id);
        if (nodeToExpand.parent) {
            do {
                nodeToExpand = nodeToExpand.parent;
                expandNode(resource, nodeToExpand.id);
            } while (nodeToExpand.parent);
        }
        if (undoableDragDrop) {
            return startUndoable(crudUpdateAction(resource, node.record.id, __assign({}, node.record, (_c = {}, _c[parentSource] = droppedOnNode.id, _c)), node.record, basePath, false));
        }
        return dispatchCrudUpdate(resource, node.record.id, __assign({}, node.record, (_d = {}, _d[parentSource] = droppedOnNode.id, _d)), node.record, basePath, false);
    },
};
var dragSourceConnect = function (connect, monitor) { return ({
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}); };
export default compose(connect(undefined, {
    dispatchCrudUpdate: crudUpdateAction,
    expandNode: expandNodeAction,
    startUndoable: startUndoableAction,
}), DragSource(DROP_TARGET_TYPE, dragSourceSpecs, dragSourceConnect));
