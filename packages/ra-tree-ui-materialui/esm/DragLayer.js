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
/**
 * Custom DragLayer from Alejandro Hernandez
 * See https://github.com/react-dnd/react-dnd/issues/592#issuecomment-399287474
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';
var styles = {
    layer: {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    item: {},
};
var CustomDragLayer = /** @class */ (function (_super) {
    __extends(CustomDragLayer, _super);
    function CustomDragLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomDragLayer.prototype.shouldComponentUpdate = function (nextProps) {
        return !isEqual(this.props.offset, nextProps.offset);
    };
    CustomDragLayer.prototype.render = function () {
        var _a = this.props, classes = _a.classes, beingDragged = _a.beingDragged, DragPreview = _a.dragPreviewComponent, itemBeingDragged = _a.itemBeingDragged, offset = _a.offset;
        if (!beingDragged || !offset)
            return null;
        return (React.createElement("div", { className: classes.layer },
            React.createElement("div", { role: "presentation", className: classes.item, style: {
                    transform: "translate(" + offset.x + "px, " + offset.y + "px)",
                } },
                React.createElement(DragPreview, { node: itemBeingDragged }))));
    };
    CustomDragLayer.propTypes = {
        beingDragged: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        dragPreviewComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
        ]).isRequired,
        itemBeingDragged: PropTypes.object,
        offset: PropTypes.object,
    };
    return CustomDragLayer;
}(Component));
export default compose(withStyles(styles), DragLayer(function (monitor) { return ({
    itemBeingDragged: monitor.getItem(),
    componentType: monitor.getItemType(),
    beingDragged: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
}); }))(CustomDragLayer);
