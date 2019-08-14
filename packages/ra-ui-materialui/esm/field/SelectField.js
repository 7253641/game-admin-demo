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
import get from 'lodash/get';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import { withTranslate } from 'ra-core';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';
import { fieldPropTypes } from './types';
/**
 * Display a value in an enumeration
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <SelectField source="gender" choices={choices} />
 *
 * By default, the text is built by
 * - finding a choice where the 'id' property equals the field value
 * - using the 'name' property an the option text
 *
 * You can also customize the properties to use for the value and text,
 * thanks to the 'optionValue' and 'optionText' attributes.
 *
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectField source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectField source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <Chip>{record.first_name} {record.last_name}</Chip>;
 * <SelectField source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The current choice is translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'M', name: 'myroot.gender.male' },
 *    { id: 'F', name: 'myroot.gender.female' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceField>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <SelectField source="gender" choices={choices} translateChoice={false}/>
 *
 * **Tip**: <ReferenceField> sets `translateChoice` to false by default.
 */
export var SelectField = function (_a) {
    var className = _a.className, source = _a.source, record = _a.record, choices = _a.choices, optionValue = _a.optionValue, optionText = _a.optionText, translate = _a.translate, translateChoice = _a.translateChoice, rest = __rest(_a, ["className", "source", "record", "choices", "optionValue", "optionText", "translate", "translateChoice"]);
    var value = get(record, source);
    var choice = choices.find(function (c) { return c[optionValue] === value; });
    if (!choice) {
        return null;
    }
    var choiceName = React.isValidElement(optionText) // eslint-disable-line no-nested-ternary
        ? React.cloneElement(optionText, { record: choice })
        : typeof optionText === 'function'
            ? optionText(choice)
            : choice[optionText];
    return (React.createElement(Typography, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps(rest)), translateChoice
        ? translate(choiceName, { _: choiceName })
        : choiceName));
};
SelectField.defaultProps = {
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
};
var enhance = compose(pure, withTranslate);
var EnhancedSelectField = enhance(SelectField);
EnhancedSelectField.defaultProps = {
    addLabel: true,
};
EnhancedSelectField.propTypes = __assign({}, Typography.propTypes, fieldPropTypes, { choices: PropTypes.arrayOf(PropTypes.object).isRequired, optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]), optionValue: PropTypes.string, translateChoice: PropTypes.bool });
EnhancedSelectField.displayName = 'EnhancedSelectField';
export default EnhancedSelectField;
