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
import { FETCH_END } from 'ra-core';
export default (function (_a, payload) {
    var type = _a.type, requestPayload = _a.payload, _b = _a.meta, restType = _b.fetch, meta = __rest(_b, ["fetch"]);
    return ({
        type: type + "_SUCCESS",
        payload: payload,
        requestPayload: requestPayload,
        meta: __assign({}, meta, { fetchResponse: restType, fetchStatus: FETCH_END }),
    });
});
