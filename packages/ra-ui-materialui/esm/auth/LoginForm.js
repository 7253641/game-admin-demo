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
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, createStyles, } from '@material-ui/core/styles';
import { withTranslate, userLogin, } from 'ra-core';
var styles = function (_a) {
    var spacing = _a.spacing;
    return createStyles({
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
    return (React.createElement(TextField, __assign({ error: !!(touched && error), helperText: touched && error }, inputProps, props, { fullWidth: true })));
};
var login = function (auth, dispatch, _a) {
    var redirectTo = _a.redirectTo;
    return dispatch(userLogin(auth, redirectTo));
};
var LoginForm = function (_a) {
    var classes = _a.classes, isLoading = _a.isLoading, handleSubmit = _a.handleSubmit, translate = _a.translate;
    return (React.createElement("form", { onSubmit: handleSubmit(login) },
        React.createElement("div", { className: classes.form },
            React.createElement("div", { className: classes.input },
                React.createElement(Field, { autoFocus: true, id: "username", name: "username", component: renderInput, label: translate('ra.auth.username'), disabled: isLoading })),
            React.createElement("div", { className: classes.input },
                React.createElement(Field, { id: "password", name: "password", component: renderInput, label: translate('ra.auth.password'), type: "password", disabled: isLoading }))),
        React.createElement(CardActions, null,
            React.createElement(Button, { variant: "raised", type: "submit", color: "primary", disabled: isLoading, className: classes.button },
                isLoading && (React.createElement(CircularProgress, { className: classes.icon, size: 18, thickness: 2 })),
                translate('ra.auth.sign_in')))));
};
var mapStateToProps = function (state) { return ({
    isLoading: state.admin.loading > 0,
}); };
var enhance = compose(withStyles(styles), withTranslate, connect(mapStateToProps), reduxForm({
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
    redirectTo: PropTypes.string,
};
export default EnhancedLoginForm;
