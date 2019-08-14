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
var react_redux_1 = require("react-redux");
var compose_1 = __importDefault(require("recompose/compose"));
var styles_1 = require("@material-ui/core/styles");
var redux_form_1 = require("redux-form");
var ra_core_1 = require("ra-core");
var NodeFormActions_1 = __importDefault(require("./NodeFormActions"));
var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
    },
};
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, array = _a.array, asyncBlurFields = _a.asyncBlurFields, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, cancelDropOnChildren = _a.cancelDropOnChildren, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, crudUpdate = _a.crudUpdate, destroy = _a.destroy, dirty = _a.dirty, dispatch = _a.dispatch, dispatchCrudUpdate = _a.dispatchCrudUpdate, form = _a.form, getTreeState = _a.getTreeState, handleSubmit = _a.handleSubmit, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, invalid = _a.invalid, isDragging = _a.isDragging, onSelect = _a.onSelect, onToggleItem = _a.onToggleItem, onUnselectItems = _a.onUnselectItems, parentSource = _a.parentSource, pristine = _a.pristine, pure = _a.pure, redirect = _a.redirect, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, startUndoable = _a.startUndoable, submit = _a.submit, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, translate = _a.translate, triggerSubmit = _a.triggerSubmit, undoable = _a.undoable, undoableDragDrop = _a.undoableDragDrop, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, props = __rest(_a, ["anyTouched", "array", "asyncBlurFields", "asyncValidate", "asyncValidating", "autofill", "blur", "cancelDropOnChildren", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "crudUpdate", "destroy", "dirty", "dispatch", "dispatchCrudUpdate", "form", "getTreeState", "handleSubmit", "initialize", "initialized", "initialValues", "invalid", "isDragging", "onSelect", "onToggleItem", "onUnselectItems", "parentSource", "pristine", "pure", "redirect", "reset", "resetSection", "save", "startUndoable", "submit", "submitFailed", "submitSucceeded", "submitting", "touch", "translate", "triggerSubmit", "undoable", "undoableDragDrop", "untouch", "valid", "validate"]);
    return props;
};
var NodeForm = /** @class */ (function (_super) {
    __extends(NodeForm, _super);
    function NodeForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on an input or button does not collapse/expand a node
            // When clicking on the form (empty spaces around inputs) however, it should
            // propagate to the parent
            if (event.target.tagName.toLowerCase() !== 'form') {
                event.stopPropagation();
            }
        };
        _this.handleDrop = function (event) {
            event.persist();
            if (_this.props.cancelDropOnChildren) {
                event.preventDefault();
            }
        };
        _this.handleSubmit = function () {
            var _a = _this.props, basePath = _a.basePath, dispatchCrudUpdate = _a.dispatchCrudUpdate, handleSubmit = _a.handleSubmit, record = _a.node.record, resource = _a.resource, startUndoable = _a.startUndoable, _b = _a.undoable, undoable = _b === void 0 ? true : _b;
            return handleSubmit(function (values) {
                return undoable
                    ? startUndoable(ra_core_1.crudUpdate(resource, record.id, __assign({}, record, values), record, basePath, false))
                    : dispatchCrudUpdate(resource, record.id, __assign({}, record, values), record, basePath, false);
            });
        };
        return _this;
    }
    NodeForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, actions = _a.actions, basePath = _a.basePath, children = _a.children, classes = _a.classes, handleSubmit = _a.handleSubmit, invalid = _a.invalid, node = _a.node, pristine = _a.pristine, resource = _a.resource, saving = _a.saving, _b = _a.submitOnEnter, submitOnEnter = _b === void 0 ? true : _b, props = __rest(_a, ["actions", "basePath", "children", "classes", "handleSubmit", "invalid", "node", "pristine", "resource", "saving", "submitOnEnter"]);
        return (react_1.default.createElement("form", __assign({ className: classes.root, onClick: this.handleClick }, sanitizeRestProps(props)),
            react_1.Children.map(children, function (field) {
                return field
                    ? react_1.cloneElement(field, {
                        basePath: field.props.basePath || basePath,
                        onDrop: _this.handleDrop,
                        record: node.record,
                        resource: resource,
                    })
                    : null;
            }),
            actions &&
                react_1.cloneElement(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource,
                    handleSubmit: this.handleSubmit,
                    handleSubmitWithRedirect: this.handleSubmit,
                    invalid: invalid,
                    pristine: pristine,
                    saving: saving,
                    submitOnEnter: submitOnEnter,
                })));
    };
    NodeForm.propTypes = {
        actions: prop_types_1.default.node,
        basePath: prop_types_1.default.string.isRequired,
        cancelDropOnChildren: prop_types_1.default.bool,
        children: prop_types_1.default.node,
        classes: prop_types_1.default.object,
        dispatchCrudUpdate: prop_types_1.default.func.isRequired,
        handleSubmit: prop_types_1.default.func.isRequired,
        invalid: prop_types_1.default.bool,
        node: prop_types_1.default.object.isRequired,
        pristine: prop_types_1.default.bool,
        resource: prop_types_1.default.string.isRequired,
        saving: prop_types_1.default.bool,
        startUndoable: prop_types_1.default.func.isRequired,
        submitOnEnter: prop_types_1.default.bool,
        undoable: prop_types_1.default.bool,
    };
    NodeForm.defaultProps = {
        actions: react_1.default.createElement(NodeFormActions_1.default, null),
    };
    return NodeForm;
}(react_1.Component));
var mapStateToProps = function (state, _a) {
    var node = _a.node;
    return ({
        form: "tree-node-form-" + node.id,
        initialValues: node.record,
        record: node.record,
    });
};
exports.default = compose_1.default(react_redux_1.connect(mapStateToProps, {
    dispatchCrudUpdate: ra_core_1.crudUpdate,
    startUndoable: ra_core_1.startUndoable,
}), redux_form_1.reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
}), styles_1.withStyles(styles))(NodeForm);
