"use strict";
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
var sanitizeRestProps = function (_a) {
    var handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, pristine = _a.pristine, saving = _a.saving, submitOnEnter = _a.submitOnEnter, rest = __rest(_a, ["handleSubmit", "handleSubmitWithRedirect", "invalid", "pristine", "saving", "submitOnEnter"]);
    return rest;
};
/**
 * This component ensure form related props are not passed to its children. This is required
 * in `NodeActions` is used inside a NodeForm and buttons not related to form (such as EditButton
 * or DeleteButton) are used.
 *
 * @example
 * const CustomNodeActions = props => (
 *     <NodeActions {...props}>
 *         <SaveButton variant="flat" />
 *         <IgnoreFormProps>
 *             <EditButton />
 *             <ShowButton />
 *             <DeleteButton />
 *         </IgnoreFormProps>
 *     </NodeActions>
 * );
 */
var IgnoreFormProps = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(react_1.Fragment, null, react_1.Children.map(children, function (child) {
        return react_1.cloneElement(child, sanitizeRestProps(props));
    })));
};
IgnoreFormProps.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
exports.default = IgnoreFormProps;
