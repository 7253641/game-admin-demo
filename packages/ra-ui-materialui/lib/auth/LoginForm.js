"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var redux_form_1 = require("redux-form");
var react_redux_1 = require("react-redux");
var compose_1 = __importDefault(require("recompose/compose"));
var CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var styles = function (_a) {
    var spacing = _a.spacing;
    return styles_1.createStyles({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: spacing.unit,
        },
    });
};
// see http://redux-form.com/6.4.3/examples/material-ui/
var renderInput = function (_a) {
    var _b = _a.meta, _c = _b === void 0 ? { touched: false, error: '' } : _b, touched = _c.touched, error = _c.error, inputProps = __rest(_a.input, []), // eslint-disable-line react/prop-types
    props = __rest(_a, ["meta", "input"]);
    return (react_1.default.createElement(TextField_1.default, __assign({ error: !!(touched && error), helperText: touched && error }, inputProps, props, { fullWidth: true })));
};
var login = function (auth, dispatch, _a) {
    var redirectTo = _a.redirectTo;
    return dispatch(ra_core_1.userLogin(auth, redirectTo));
};
var LoginForm = function (_a) {
    var classes = _a.classes, isLoading = _a.isLoading, handleSubmit = _a.handleSubmit, translate = _a.translate;
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(login) },
        react_1.default.createElement("div", { className: classes.form },
            react_1.default.createElement("div", { className: classes.input },
                react_1.default.createElement(redux_form_1.Field, { autoFocus: true, id: "username", name: "username", component: renderInput, label: translate('ra.auth.username'), disabled: isLoading })),
            react_1.default.createElement("div", { className: classes.input },
                react_1.default.createElement(redux_form_1.Field, { id: "password", name: "password", component: renderInput, label: translate('ra.auth.password'), type: "password", disabled: isLoading }))),
        react_1.default.createElement(CardActions_1.default, null,
            react_1.default.createElement(Button_1.default, { variant: "raised", type: "submit", color: "primary", disabled: isLoading, className: classes.button },
                isLoading && (react_1.default.createElement(CircularProgress_1.default, { className: classes.icon, size: 18, thickness: 2 })),
                translate('ra.auth.sign_in')))));
};
var mapStateToProps = function (state) { return ({
    isLoading: state.admin.loading > 0,
}); };
var enhance = compose_1.default(styles_1.withStyles(styles), ra_core_1.withTranslate, react_redux_1.connect(mapStateToProps), redux_form_1.reduxForm({
    form: 'signIn',
    validate: function (values, props) {
        var errors = { username: '', password: '' };
        var translate = props.translate;
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    },
}));
var EnhancedLoginForm = enhance(LoginForm);
EnhancedLoginForm.propTypes = {
    redirectTo: prop_types_1.default.string,
};
exports.default = EnhancedLoginForm;
