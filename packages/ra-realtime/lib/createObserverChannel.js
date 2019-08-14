"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_saga_1 = require("redux-saga");
var realtimeObserver_1 = __importDefault(require("./realtimeObserver"));
exports.createSubscribeFactory = function (realtimeObserverImpl) { return function (watcher, emitter) {
    var observer = realtimeObserverImpl(emitter);
    var result = watcher.subscribe(observer);
    return result.unsubscribe;
}; };
exports.default = (function (watcher) {
    return redux_saga_1.eventChannel(function (emitter) {
        return exports.createSubscribeFactory(realtimeObserver_1.default)(watcher, emitter);
    });
});
