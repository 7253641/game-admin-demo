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
/**
 * Custom DragLayer from Alejandro Hernandez
 * See https://github.com/react-dnd/react-dnd/issues/592#issuecomment-399287474
 */
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_dnd_1 = require("react-dnd");
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var isEqual_1 = __importDefault(require("lodash/isEqual"));
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
        return !isEqual_1.default(this.props.offset, nextProps.offset);
    };
    CustomDragLayer.prototype.render = function () {
        var _a = this.props, classes = _a.classes, beingDragged = _a.beingDragged, DragPreview = _a.dragPreviewComponent, itemBeingDragged = _a.itemBeingDragged, offset = _a.offset;
        if (!beingDragged || !offset)
            return null;
        return (react_1.default.createElement("div", { className: classes.layer },
            react_1.default.createElement("div", { role: "presentation", className: classes.item, style: {
                    transform: "translate(" + offset.x + "px, " + offset.y + "px)",
                } },
                react_1.default.createElement(DragPreview, { node: itemBeingDragged }))));
    };
    CustomDragLayer.propTypes = {
        beingDragged: prop_types_1.default.bool,
        classes: prop_types_1.default.object.isRequired,
        dragPreviewComponent: prop_types_1.default.oneOfType([
            prop_types_1.default.element,
            prop_types_1.default.func,
        ]).isRequired,
        itemBeingDragged: prop_types_1.default.object,
        offset: prop_types_1.default.object,
    };
    return CustomDragLayer;
}(react_1.Component));
exports.default = compose_1.default(styles_1.withStyles(styles), react_dnd_1.DragLayer(function (monitor) { return ({
    itemBeingDragged: monitor.getItem(),
    componentType: monitor.getItemType(),
    beingDragged: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
}); }))(CustomDragLayer);
