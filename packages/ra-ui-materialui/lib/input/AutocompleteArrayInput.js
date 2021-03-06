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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var get_1 = __importDefault(require("lodash/get"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_autosuggest_1 = __importDefault(require("react-autosuggest"));
var Chip_1 = __importDefault(require("@material-ui/core/Chip"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Popper_1 = __importDefault(require("@material-ui/core/Popper"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var styles_1 = require("@material-ui/core/styles");
var parse_1 = __importDefault(require("autosuggest-highlight/parse"));
var match_1 = __importDefault(require("autosuggest-highlight/match"));
var blue_1 = __importDefault(require("@material-ui/core/colors/blue"));
var compose_1 = __importDefault(require("recompose/compose"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var AutocompleteArrayInputChip_1 = __importDefault(require("./AutocompleteArrayInputChip"));
var styles = function (theme) {
    return styles_1.createStyles({
        container: {
            flexGrow: 1,
            position: 'relative',
        },
        root: {},
        suggestionsContainerOpen: {
            position: 'absolute',
            marginBottom: theme.spacing.unit * 3,
            zIndex: 2,
        },
        suggestionsPaper: {
            maxHeight: '50vh',
            overflowY: 'auto',
        },
        suggestion: {
            display: 'block',
            fontFamily: theme.typography.fontFamily,
        },
        suggestionText: { fontWeight: 300 },
        highlightedSuggestionText: { fontWeight: 500 },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
        },
        chip: {
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
        },
        chipDisabled: {
            pointerEvents: 'none',
        },
        chipFocused: {
            backgroundColor: blue_1.default[300],
        },
    });
};
/**
 * An Input component for an autocomplete field, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <AutocompleteArrayInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <AutocompleteArrayInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <AutocompleteArrayInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'M', name: 'myroot.gender.male' },
 *    { id: 'F', name: 'myroot.gender.female' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <AutocompleteArrayInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <AutoComplete> component
 *
 * @example
 * <AutocompleteArrayInput source="author_id" options={{ fullWidthInput: true }} />
 */
var AutocompleteArrayInput = /** @class */ (function (_super) {
    __extends(AutocompleteArrayInput, _super);
    function AutocompleteArrayInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialInputValue = [];
        _this.state = {
            dirty: false,
            inputValue: _this.initialInputValue,
            searchText: '',
            suggestions: [],
        };
        _this.inputEl = null;
        _this.anchorEl = null;
        _this.getInputValue = function (inputValue) {
            return inputValue === '' ? _this.initialInputValue : inputValue;
        };
        _this.getSuggestionValue = function (suggestion) { return get_1.default(suggestion, _this.props.optionValue); };
        _this.getSuggestionText = function (suggestion) {
            if (!suggestion)
                return '';
            var _a = _this.props, optionText = _a.optionText, translate = _a.translate, translateChoice = _a.translateChoice;
            var suggestionLabel = typeof optionText === 'function'
                ? optionText(suggestion)
                : get_1.default(suggestion, optionText);
            // We explicitly call toString here because AutoSuggest expect a string
            return translateChoice
                ? translate(suggestionLabel, { _: suggestionLabel }).toString()
                : suggestionLabel.toString();
        };
        _this.handleSuggestionSelected = function (event, _a) {
            var suggestion = _a.suggestion, method = _a.method;
            var input = _this.props.input;
            input.onChange((_this.state.inputValue || []).concat([
                _this.getSuggestionValue(suggestion),
            ]));
            if (method === 'enter') {
                event.preventDefault();
            }
        };
        _this.handleSuggestionsFetchRequested = function () {
            var _a = _this.props, choices = _a.choices, inputValueMatcher = _a.inputValueMatcher;
            _this.setState(function (_a) {
                var searchText = _a.searchText;
                return ({
                    suggestions: choices.filter(function (suggestion) {
                        return inputValueMatcher(searchText, suggestion, _this.getSuggestionText);
                    }),
                });
            });
        };
        _this.handleSuggestionsClearRequested = function () {
            _this.updateFilter('');
        };
        _this.handleMatchSuggestionOrFilter = function (inputValue) {
            _this.setState({
                dirty: true,
                searchText: inputValue,
            });
            _this.updateFilter(inputValue);
        };
        _this.handleChange = function (event, _a) {
            var newValue = _a.newValue, method = _a.method;
            if (['type', 'escape'].includes(method)) {
                _this.handleMatchSuggestionOrFilter(newValue);
            }
        };
        _this.renderInput = function (inputProps) {
            var _a = _this.props, input = _a.input, fullWidth = _a.fullWidth, _b = _a.options, InputProps = _b.InputProps, suggestionsContainerProps = _b.suggestionsContainerProps, options = __rest(_b, ["InputProps", "suggestionsContainerProps"]);
            var autoFocus = inputProps.autoFocus, className = inputProps.className, classes = inputProps.classes, isRequired = inputProps.isRequired, label = inputProps.label, meta = inputProps.meta, onChange = inputProps.onChange, resource = inputProps.resource, source = inputProps.source, value = inputProps.value, ref = inputProps.ref, other = __rest(inputProps, ["autoFocus", "className", "classes", "isRequired", "label", "meta", "onChange", "resource", "source", "value", "ref"]);
            if (typeof meta === 'undefined') {
                throw new Error("The TextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }
            var touched = meta.touched, error = meta.error, _c = meta.helperText, helperText = _c === void 0 ? false : _c;
            // We need to store the input reference for our Popper element containg the suggestions
            // but Autosuggest also needs this reference (it provides the ref prop)
            var storeInputRef = function (input) {
                _this.inputEl = input;
                _this.updateAnchorEl();
                ref(input);
            };
            var finalOptions = __assign({ fullWidth: fullWidth }, options);
            return (react_1.default.createElement(AutocompleteArrayInputChip_1.default, __assign({ clearInputValueOnChange: true, onUpdateInput: onChange, onAdd: _this.handleAdd, onDelete: _this.handleDelete, value: _this.getInputValue(input.value), inputRef: storeInputRef, error: !!(touched && error), helperText: (touched && error) || helperText, chipRenderer: _this.renderChip, label: react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }) }, other, finalOptions)));
        };
        _this.renderChip = function (_a, key) {
            var value = _a.value, isFocused = _a.isFocused, isDisabled = _a.isDisabled, handleClick = _a.handleClick, handleDelete = _a.handleDelete;
            var _b;
            var _c = _this.props, _d = _c.classes, classes = _d === void 0 ? {} : _d, choices = _c.choices;
            var suggestion = choices.find(function (choice) { return _this.getSuggestionValue(choice) === value; });
            return (react_1.default.createElement(Chip_1.default, { key: key, className: classnames_1.default(classes.chip, (_b = {},
                    _b[classes.chipDisabled] = isDisabled,
                    _b[classes.chipFocused] = isFocused,
                    _b)), onClick: handleClick, onDelete: handleDelete, label: _this.getSuggestionText(suggestion) }));
        };
        _this.handleAdd = function (chip) {
            var _a = _this.props, choices = _a.choices, input = _a.input, limitChoicesToValue = _a.limitChoicesToValue, inputValueMatcher = _a.inputValueMatcher;
            var filteredChoices = choices.filter(function (choice) {
                return inputValueMatcher(chip, choice, _this.getSuggestionText);
            });
            var choice = filteredChoices.length === 1
                ? filteredChoices[0]
                : filteredChoices.find(function (c) { return _this.getSuggestionValue(c) === chip; });
            if (choice) {
                return input.onChange((_this.state.inputValue || []).concat([
                    _this.getSuggestionValue(choice),
                ]));
            }
            if (limitChoicesToValue) {
                // Ensure to reset the filter
                _this.updateFilter('');
                return;
            }
            input.onChange(_this.state.inputValue.concat([chip]));
        };
        _this.handleDelete = function (chip) {
            var input = _this.props.input;
            input.onChange(_this.state.inputValue.filter(function (value) { return value !== chip; }));
        };
        _this.renderSuggestionsContainer = function (autosuggestOptions) {
            var _a = autosuggestOptions.containerProps, className = _a.className, containerProps = __rest(_a, ["className"]), children = autosuggestOptions.children;
            var _b = _this.props, _c = _b.classes, classes = _c === void 0 ? {} : _c, options = _b.options;
            // Force the Popper component to reposition the popup only when this.inputEl is moved to another location
            _this.updateAnchorEl();
            return (react_1.default.createElement(Popper_1.default, __assign({ className: className, open: Boolean(children), anchorEl: _this.anchorEl, placement: "bottom-start" }, options.suggestionsContainerProps),
                react_1.default.createElement(Paper_1.default, __assign({ square: true, className: classes.suggestionsPaper }, containerProps), children)));
        };
        _this.renderSuggestionComponent = function (_a) {
            var suggestion = _a.suggestion, query = _a.query, isHighlighted = _a.isHighlighted, props = __rest(_a, ["suggestion", "query", "isHighlighted"]);
            return react_1.default.createElement("div", __assign({}, props));
        };
        _this.renderSuggestion = function (suggestion, _a) {
            var query = _a.query, isHighlighted = _a.isHighlighted;
            var label = _this.getSuggestionText(suggestion);
            var matches = match_1.default(label, query);
            var parts = parse_1.default(label, matches);
            var _b = _this.props, _c = _b.classes, classes = _c === void 0 ? {} : _c, suggestionComponent = _b.suggestionComponent;
            return (react_1.default.createElement(MenuItem_1.default, { selected: isHighlighted, component: suggestionComponent || _this.renderSuggestionComponent, suggestion: suggestion, query: query, isHighlighted: isHighlighted },
                react_1.default.createElement("div", null, parts.map(function (part, index) {
                    return part.highlight ? (react_1.default.createElement("span", { key: index, className: classes.highlightedSuggestionText }, part.text)) : (react_1.default.createElement("strong", { key: index, className: classes.suggestionText }, part.text));
                }))));
        };
        _this.handleFocus = function () {
            var input = _this.props.input;
            input && input.onFocus && input.onFocus();
        };
        _this.updateFilter = function (value) {
            var _a = _this.props, setFilter = _a.setFilter, choices = _a.choices;
            if (_this.previousFilterValue !== value) {
                if (setFilter) {
                    setFilter(value);
                }
                else {
                    _this.setState({
                        searchText: value,
                        suggestions: choices.filter(function (choice) {
                            return _this.getSuggestionText(choice)
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        }),
                    });
                }
            }
            _this.previousFilterValue = value;
        };
        _this.shouldRenderSuggestions = function (val) {
            var shouldRenderSuggestions = _this.props.shouldRenderSuggestions;
            if (shouldRenderSuggestions !== undefined &&
                typeof shouldRenderSuggestions === 'function') {
                return shouldRenderSuggestions(val);
            }
            return true;
        };
        return _this;
    }
    AutocompleteArrayInput.prototype.componentWillMount = function () {
        this.setState({
            inputValue: this.getInputValue(this.props.input.value),
            suggestions: this.props.choices,
        });
    };
    AutocompleteArrayInput.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var choices = nextProps.choices, input = nextProps.input, inputValueMatcher = nextProps.inputValueMatcher;
        if (!isEqual_1.default(this.getInputValue(input.value), this.state.inputValue)) {
            this.setState({
                inputValue: this.getInputValue(input.value),
                dirty: false,
                suggestions: this.props.choices,
            });
            // Ensure to reset the filter
            this.updateFilter('');
        }
        else if (!isEqual_1.default(choices, this.props.choices)) {
            this.setState(function (_a) {
                var searchText = _a.searchText;
                return ({
                    suggestions: choices.filter(function (suggestion) {
                        return inputValueMatcher(searchText, suggestion, _this.getSuggestionText);
                    }),
                });
            });
        }
    };
    AutocompleteArrayInput.prototype.updateAnchorEl = function () {
        if (!this.inputEl) {
            return;
        }
        var inputPosition = this.inputEl.getBoundingClientRect();
        if (!this.anchorEl) {
            this.anchorEl = { getBoundingClientRect: function () { return inputPosition; } };
        }
        else {
            var anchorPosition = this.anchorEl.getBoundingClientRect();
            if (anchorPosition.x !== inputPosition.x ||
                anchorPosition.y !== inputPosition.y) {
                this.anchorEl = { getBoundingClientRect: function () { return inputPosition; } };
            }
        }
    };
    AutocompleteArrayInput.prototype.render = function () {
        var _a = this.props, alwaysRenderSuggestions = _a.alwaysRenderSuggestions, _b = _a.classes, classes = _b === void 0 ? {} : _b, isRequired = _a.isRequired, label = _a.label, meta = _a.meta, resource = _a.resource, source = _a.source, className = _a.className, options = _a.options;
        var _c = this.state, suggestions = _c.suggestions, searchText = _c.searchText;
        return (react_1.default.createElement(react_autosuggest_1.default, { theme: {
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
            }, renderInputComponent: this.renderInput, suggestions: suggestions, alwaysRenderSuggestions: alwaysRenderSuggestions, onSuggestionSelected: this.handleSuggestionSelected, onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested, onSuggestionsClearRequested: this.handleSuggestionsClearRequested, renderSuggestionsContainer: this.renderSuggestionsContainer, getSuggestionValue: this.getSuggestionText, renderSuggestion: this.renderSuggestion, shouldRenderSuggestions: this.shouldRenderSuggestions, inputProps: {
                blurBehavior: 'add',
                className: className,
                classes: classes,
                isRequired: isRequired,
                label: label,
                meta: meta,
                onChange: this.handleChange,
                resource: resource,
                source: source,
                value: searchText,
                onFocus: this.handleFocus,
                options: options,
            } }));
    };
    return AutocompleteArrayInput;
}(react_1.default.Component));
exports.AutocompleteArrayInput = AutocompleteArrayInput;
AutocompleteArrayInput.propTypes = {
    allowEmpty: prop_types_1.default.bool,
    alwaysRenderSuggestions: prop_types_1.default.bool,
    choices: prop_types_1.default.arrayOf(prop_types_1.default.object),
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    InputProps: prop_types_1.default.object,
    input: prop_types_1.default.object,
    inputValueMatcher: prop_types_1.default.func,
    isRequired: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    limitChoicesToValue: prop_types_1.default.bool,
    meta: prop_types_1.default.object,
    options: prop_types_1.default.object,
    optionText: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.func])
        .isRequired,
    optionValue: prop_types_1.default.string.isRequired,
    resource: prop_types_1.default.string,
    setFilter: prop_types_1.default.func,
    shouldRenderSuggestions: prop_types_1.default.func,
    source: prop_types_1.default.string,
    suggestionComponent: prop_types_1.default.func,
    translate: prop_types_1.default.func.isRequired,
    translateChoice: prop_types_1.default.bool.isRequired,
};
AutocompleteArrayInput.defaultProps = {
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    limitChoicesToValue: false,
    translateChoice: true,
    inputValueMatcher: function (input, suggestion, getOptionText) {
        return getOptionText(suggestion)
            .toLowerCase()
            .trim()
            .includes(input.toLowerCase().trim());
    },
};
exports.default = compose_1.default(ra_core_1.addField, ra_core_1.translate, styles_1.withStyles(styles))(AutocompleteArrayInput);
