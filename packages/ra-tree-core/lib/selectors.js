"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsNodeExpanded = function (state, resource, nodeId) {
    return (state[resource] && state[resource][nodeId]) || false;
};
