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
var compose_1 = __importDefault(require("recompose/compose"));
var classnames_1 = __importDefault(require("classnames"));
var InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var styles_1 = require("@material-ui/core/styles");
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var ra_core_1 = require("ra-core");
var styles = styles_1.createStyles({
    clearIcon: {
        height: 16,
        width: 0,
    },
    visibleClearIcon: {
        width: 16,
    },
    clearButton: {
        height: 24,
        width: 0,
    },
    visibleClearButton: {
        width: 24,
    },
});
/**
 * An override of the default Material-UI TextField which is resettable
 */
var ResettableTextField = /** @class */ (function (_super) {
    __extends(ResettableTextField, _super);
    function ResettableTextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showClear: false };
        _this.handleClickClearButton = function (event) {
            event.preventDefault();
            _this.props.onChange('');
        };
        _this.handleMouseDownClearButton = function (event) {
            event.preventDefault();
        };
        _this.handleFocus = function (event) {
            _this.setState({ showClear: true });
            _this.props.onFocus && _this.props.onFocus(event);
        };
        _this.handleBlur = function (event) {
            _this.setState({ showClear: false });
            _this.props.onBlur && _this.props.onBlur(event);
        };
        return _this;
    }
    ResettableTextField.prototype.render = function () {
        var _a, _b;
        var _c = this.props, translate = _c.translate, classes = _c.classes, clearAlwaysVisible = _c.clearAlwaysVisible, InputProps = _c.InputProps, value = _c.value, resettable = _c.resettable, disabled = _c.disabled, props = __rest(_c, ["translate", "classes", "clearAlwaysVisible", "InputProps", "value", "resettable", "disabled"]);
        var showClear = this.state.showClear;
        var clearButton = classes.clearButton, clearIcon = classes.clearIcon, visibleClearButton = classes.visibleClearButton, visibleClearIcon = classes.visibleClearIcon, restClasses = __rest(classes, ["clearButton", "clearIcon", "visibleClearButton", "visibleClearIcon"]);
        return (react_1.default.createElement(TextField_1.default, __assign({ classes: restClasses, value: value, InputProps: __assign({ endAdornment: resettable && value && (react_1.default.createElement(InputAdornment_1.default, { position: "end" },
                    react_1.default.createElement(IconButton_1.default, { className: classnames_1.default(clearButton, (_a = {},
                            _a[visibleClearButton] = clearAlwaysVisible || showClear,
                            _a)), "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value'), disableRipple: true, onClick: this.handleClickClearButton, onMouseDown: this.handleMouseDownClearButton, disabled: disabled },
                        react_1.default.createElement(Clear_1.default, { className: classnames_1.default(clearIcon, (_b = {},
                                _b[visibleClearIcon] = clearAlwaysVisible || showClear,
                                _b)) })))) }, InputProps), disabled: disabled }, props, { onFocus: this.handleFocus, onBlur: this.handleBlur })));
    };
    ResettableTextField.propTypes = {
        classes: prop_types_1.default.object.isRequired,
        clearAlwaysVisible: prop_types_1.default.bool,
        disabled: prop_types_1.default.bool,
        InputProps: prop_types_1.default.object,
        onBlur: prop_types_1.default.func,
        onChange: prop_types_1.default.func.isRequired,
        onFocus: prop_types_1.default.func,
        resettable: prop_types_1.default.bool,
        translate: prop_types_1.default.func.isRequired,
        value: prop_types_1.default.any.isRequired,
    };
    return ResettableTextField;
}(react_1.Component));
exports.default = compose_1.default(ra_core_1.translate, styles_1.withStyles(styles))(ResettableTextField);
