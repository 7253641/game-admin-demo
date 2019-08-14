var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, call, put, take, cancelled } from 'redux-saga/effects';
import { CRUD_GET_LIST, CRUD_GET_ONE, FETCH_START, FETCH_END } from 'ra-core';
import omit from 'lodash/omit';
import buildAction from './buildAction';
import createObserverChannel from './createObserverChannel';
export var watchCrudActionsFactory = function (observeRequest) {
    return function watchCrudActions(action) {
        var params, _a, fetchType, resource, observer, realtimeChannel, payload, type, requestPayload, meta, raAction;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = action.payload, _a = action.meta, fetchType = _a.fetch, resource = _a.resource;
                    return [4 /*yield*/, call(observeRequest, fetchType, resource, params)];
                case 1:
                    observer = _b.sent();
                    if (!observer)
                        return [2 /*return*/];
                    return [4 /*yield*/, call(createObserverChannel, observer)];
                case 2:
                    realtimeChannel = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, , 11, 13]);
                    _b.label = 4;
                case 4:
                    if (!true) return [3 /*break*/, 10];
                    return [4 /*yield*/, take(realtimeChannel)];
                case 5:
                    payload = _b.sent();
                    type = action.type, requestPayload = action.payload, meta = action.meta;
                    return [4 /*yield*/, [
                            put({
                                type: type + "_LOADING",
                                payload: requestPayload,
                                meta: omit(meta, 'fetch'),
                            }),
                            put({ type: FETCH_START }),
                        ]];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, call(buildAction, action, payload)];
                case 7:
                    raAction = _b.sent();
                    return [4 /*yield*/, put(raAction)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, put({ type: FETCH_END })];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, cancelled() && realtimeChannel];
                case 12:
                    if (_b.sent()) {
                        realtimeChannel.close();
                    }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    };
};
export var watchLocationChangeFactory = function (watchCrudActions) {
    return function watchLocationChange() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, takeLatest([CRUD_GET_LIST, CRUD_GET_ONE], watchCrudActions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};
export default (function (observeQuery) {
    return function realtimeSaga() {
        var watchCrudActions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    watchCrudActions = watchCrudActionsFactory(observeQuery);
                    return [4 /*yield*/, takeLatest(LOCATION_CHANGE, watchLocationChangeFactory(watchCrudActions))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
});
