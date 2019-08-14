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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultGetTreeFromArray from './getTreeFromArray';
import { getIsNodeExpanded } from './selectors';
import { closeNode as closeNodeAction, expandNode as expandNodeAction, toggleNode as toggleNodeAction, } from './actions';
import { Component } from 'react';
var defaultGetTreeState = function (state) { return state.tree; };
var TreeControllerView = /** @class */ (function (_super) {
    __extends(TreeControllerView, _super);
    function TreeControllerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleGetIsNodeExpanded = function (nodeId) {
            return getIsNodeExpanded(_this.props.treeState, _this.props.resource, nodeId);
        };
        _this.handleCloseNode = function (nodeId) {
            return _this.props.closeNode(_this.props.resource, nodeId);
        };
        _this.handleExpandNode = function (nodeId) {
            return _this.props.expandNode(_this.props.resource, nodeId);
        };
        _this.handleToggleNode = function (nodeId) {
            return _this.props.toggleNode(_this.props.resource, nodeId);
        };
        return _this;
    }
    TreeControllerView.prototype.render = function () {
        var _a = this.props, children = _a.children, closeNode = _a.closeNode, expandNode = _a.expandNode, _b = _a.data, fetchedAt = _b.fetchedAt, data = __rest(_b, ["fetchedAt"]), getTreeFromArray = _a.getTreeFromArray, getTreeState = _a.getTreeState, ids = _a.ids, parentSource = _a.parentSource, resource = _a.resource, toggleNode = _a.toggleNode, treeState = _a.treeState, props = __rest(_a, ["children", "closeNode", "expandNode", "data", "getTreeFromArray", "getTreeState", "ids", "parentSource", "resource", "toggleNode", "treeState"]);
        var availableData = ids.reduce(function (acc, id) { return acc.concat([data[id]]); }, []);
        var tree = getTreeFromArray(Object.values(availableData), parentSource);
        return children(__assign({ getIsNodeExpanded: this.handleGetIsNodeExpanded, parentSource: parentSource,
            tree: tree, closeNode: this.handleCloseNode, expandNode: this.handleExpandNode, toggleNode: this.handleToggleNode, resource: resource }, props));
    };
    TreeControllerView.propTypes = {
        basePath: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        closeNode: PropTypes.func.isRequired,
        expandNode: PropTypes.func.isRequired,
        ids: PropTypes.array.isRequired,
        data: PropTypes.object.isRequired,
        getTreeFromArray: PropTypes.func,
        getTreeState: PropTypes.func,
        parentSource: PropTypes.string,
        resource: PropTypes.string.isRequired,
        toggleNode: PropTypes.func.isRequired,
        treeState: PropTypes.object,
    };
    return TreeControllerView;
}(Component));
export { TreeControllerView };
var mapStateToProps = function (state, _a) {
    var getTreeState = _a.getTreeState;
    return ({
        treeState: getTreeState(state),
    });
};
var TreeController = connect(mapStateToProps, {
    closeNode: closeNodeAction,
    expandNode: expandNodeAction,
    toggleNode: toggleNodeAction,
})(TreeControllerView);
TreeController.defaultProps = {
    getTreeFromArray: defaultGetTreeFromArray,
    getTreeState: defaultGetTreeState,
    parentSource: 'parent_id',
};
export default TreeController;
