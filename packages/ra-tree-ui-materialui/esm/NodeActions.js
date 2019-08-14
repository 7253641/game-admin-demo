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
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
        return (React.createElement("span", { className: classes.root }, Children.map(children, function (action) {
            return action ? cloneElement(action, props) : null;
        })));
    };
    NodeActions.propTypes = {
        classes: PropTypes.object.isRequired,
        basePath: PropTypes.string.isRequired,
        children: PropTypes.node,
        record: PropTypes.object.isRequired,
        resource: PropTypes.string.isRequired,
    };
    return NodeActions;
}(Component));
export { NodeActions };
export default withStyles(styles)(NodeActions);
