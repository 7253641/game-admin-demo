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
Object.defineProperty(exports, "__esModule", { value: true });
var performant_array_to_tree_1 = require("performant-array-to-tree");
/**
 * Recursivly create nodes.
 */
var createNode = function (_a) {
    var children = _a.children, node = __rest(_a, ["children"]);
    return ({
        id: node.data.id,
        record: node.data,
        children: children ? children.map(function (child) { return createNode(child); }) : [],
    });
};
/**
 * Recursivly add a parent property to every nodes so that they can a reference to their parent
 */
var addParent = function (node, parent) { return (__assign({}, node, { children: node.children.map(function (child) { return addParent(child, node); }), parent: parent })); };
/**
 * Build a tree representation of the data returned by the List component
 */
exports.default = (function (data, parentSource) {
    // arrayToTree requires top level nodes to have their parent id set to null
    var sanitizedData = data.map(function (item) {
        var _a;
        return (__assign({}, item, (_a = {}, _a[parentSource] = item[parentSource] || null, _a)));
    });
    return performant_array_to_tree_1.arrayToTree(sanitizedData, {
        id: 'id',
        parentId: parentSource,
    })
        .map(function (node) { return createNode(node, 1); })
        .map(function (node) { return addParent(node, null); });
});
