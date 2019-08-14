"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOGGLE_NODE = 'RA/TREE/TOGGLE_NODE';
exports.EXPAND_NODE = 'RA/TREE/EXPAND_NODE';
exports.CLOSE_NODE = 'RA/TREE/CLOSE_NODE';
exports.toggleNode = function (resource, nodeId) { return ({
    type: exports.TOGGLE_NODE,
    payload: nodeId,
    meta: { resource: resource },
}); };
exports.expandNode = function (resource, nodeId) { return ({
    type: exports.EXPAND_NODE,
    payload: nodeId,
    meta: { resource: resource },
}); };
exports.closeNode = function (resource, nodeId) { return ({
    type: exports.CLOSE_NODE,
    payload: nodeId,
    meta: { resource: resource },
}); };
