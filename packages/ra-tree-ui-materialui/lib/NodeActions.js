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
var styles_1 = require("@material-ui/core/styles");
var styles = function (theme) { return ({
    root: {
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: theme.spacing.unit * 4,
    },
}); };
var NodeActions = /** @class */ (function (_super) {
    __extends(NodeActions, _super);
    function NodeActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeActions.prototype.render = function () {
        var _a = this.props, children = _a.children, classes = _a.classes, props = __rest(_a, ["children", "classes"]);
        return (react_1.default.createElement("span", { className: classes.root }, react_1.Children.map(children, function (action) {
            return action ? react_1.cloneElement(action, props) : null;
        })));
    };
    NodeActions.propTypes = {
        classes: prop_types_1.default.object.isRequired,
        basePath: prop_types_1.default.string.isRequired,
        children: prop_types_1.default.node,
        record: prop_types_1.default.object.isRequired,
        resource: prop_types_1.default.string.isRequired,
    };
    return NodeActions;
}(react_1.Component));
exports.NodeActions = NodeActions;
exports.default = styles_1.withStyles(styles)(NodeActions);
