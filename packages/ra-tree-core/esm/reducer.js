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
import { CLOSE_NODE, TOGGLE_NODE, EXPAND_NODE } from './actions';
var initialState = {};
export default (function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, nodeId = _a.payload, meta = _a.meta;
    var _b, _c;
    if (![CLOSE_NODE, TOGGLE_NODE, EXPAND_NODE].includes(type)) {
        return state;
    }
    if (!meta.resource) {
        console.warn("The " + type + " action does not have a resource meta"); // eslint-disable-line
        return state;
    }
    return __assign({}, state, (_b = {}, _b[meta.resource] = __assign({}, (state[meta.resource] || {}), (_c = {}, _c[nodeId] = type === TOGGLE_NODE
        ? state[meta.resource]
            ? !state[meta.resource][nodeId]
            : true
        : type === EXPAND_NODE, _c)), _b));
});
