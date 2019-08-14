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
var classnames_1 = __importDefault(require("classnames"));
var react_dnd_1 = require("react-dnd");
var styles_1 = require("@material-ui/core/styles");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var GetApp_1 = __importDefault(require("@material-ui/icons/GetApp"));
var ra_core_1 = require("ra-core");
var constants_1 = require("./constants");
var styles = function (theme) { return ({
    root: {
        paddingLeft: theme.spacing.unit * 6,
    },
    text: {
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    hover: {
        backgroundColor: theme.palette.action.active,
    },
}); };
var RootDropTarget = /** @class */ (function (_super) {
    __extends(RootDropTarget, _super);
    function RootDropTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootDropTarget.prototype.shouldComponentUpdate = function (nextProps) {
        return (this.props.canDrop !== nextProps.canDrop ||
            this.props.isOverCurrent !== nextProps.isOverCurrent);
    };
    RootDropTarget.prototype.render = function () {
        var _a;
        var _b = this.props, canDrop = _b.canDrop, classes = _b.classes, connectDropTarget = _b.connectDropTarget, isOverCurrent = _b.isOverCurrent, translate = _b.translate;
        return (react_1.default.createElement(ListItem_1.default, { className: classnames_1.default(classes.root, (_a = {},
                _a[classes.hover] = canDrop && isOverCurrent,
                _a)), disabled: !canDrop },
            react_1.default.createElement(GetApp_1.default, null),
            connectDropTarget(react_1.default.createElement("div", null,
                react_1.default.createElement(Typography_1.default, { className: classes.text }, translate('ra.tree.root_target'))))));
    };
    RootDropTarget.propTypes = {
        canDrop: prop_types_1.default.bool,
        classes: prop_types_1.default.object.isRequired,
        connectDropTarget: prop_types_1.default.func.isRequired,
        isOverCurrent: prop_types_1.default.bool,
        translate: prop_types_1.default.func.isRequired,
    };
    return RootDropTarget;
}(react_1.Component));
var dropTargetSpecs = {
    drop: function (props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return { id: null, record: { id: null } };
        }
        return undefined;
    },
    canDrop: function (props, monitor) {
        var item = monitor.getItem();
        return !!item.parent;
    },
};
var dropTargetConnect = function (connect, monitor) { return ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    item: monitor.getItem(),
}); };
exports.default = compose_1.default(react_dnd_1.DropTarget(constants_1.DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect), ra_core_1.translate, styles_1.withStyles(styles))(RootDropTarget);
