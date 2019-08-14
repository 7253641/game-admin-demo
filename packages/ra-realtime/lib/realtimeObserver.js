"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_saga_1 = require("redux-saga");
exports.default = (function (emitter) { return ({
    complete: function () {
        emitter(redux_saga_1.END);
    },
    error: function () {
        emitter(redux_saga_1.END);
    },
    next: function (value) {
        emitter(value);
    },
}); });
