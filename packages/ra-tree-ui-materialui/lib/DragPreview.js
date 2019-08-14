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
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var styles = function (theme) { return ({
    item: {
        alignItems: 'center',
        backgroundColor: theme.palette.action.active,
        display: 'inline-flex',
        height: 72,
        minWidth: 72,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 4,
    },
}); };
var DragPreview = /** @class */ (function (_super) {
    __extends(DragPreview, _super);
    function DragPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragPreview.prototype.shouldComponentUpdate = function () {
        return false;
    };
    DragPreview.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, classes = _a.classes, node = _a.node, style = _a.style, translate = _a.translate;
        return (react_1.default.createElement("div", { className: className || classes.item, style: style }, children
            ? typeof children === 'function'
                ? children({ node: node, translate: translate })
                : children
            : translate('ra.tree.drag_preview', {
                id: node.id,
                smart_count: node.children.length,
            })));
    };
    return DragPreview;
}(react_1.Component));
DragPreview.propTypes = {
    children: prop_types_1.default.oneOfType([prop_types_1.default.node, prop_types_1.default.func]),
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    node: prop_types_1.default.object,
    style: prop_types_1.default.object,
    translate: prop_types_1.default.func.isRequired,
};
exports.default = compose_1.default(ra_core_1.translate, styles_1.withStyles(styles))(DragPreview);
