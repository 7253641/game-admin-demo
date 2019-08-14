export var getIsNodeExpanded = function (state, resource, nodeId) {
    return (state[resource] && state[resource][nodeId]) || false;
};
