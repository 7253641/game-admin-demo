"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN_1 = __importDefault(require("faker/locale/zh_CN"));
exports.weightedArrayElement = function (values, weights) {
    return zh_CN_1.default.random.arrayElement(values.reduce(function (acc, value, index) {
        return acc.concat(new Array(weights[index]).fill(value));
    }, []));
};
exports.weightedBoolean = function (likelyhood) {
    return zh_CN_1.default.random.number(99) < likelyhood;
};
exports.randomDate = function (minDate, maxDate) {
    var minTs = minDate instanceof Date
        ? minDate.getTime()
        : Date.now() -
            2 * 365 * 24 * 60 * 60 * 1000 + // 2年前
            4 * 30 * 24 * 60 * 60 * 1000 - // 5个月前
            14 * 24 * 60 * 60 * 1000;
    // const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
    var maxTs = maxDate instanceof Date
        ? maxDate.getTime()
        : Date.now() -
            2 * 365 * 24 * 60 * 60 * 1000 + // 2年前
            4 * 30 * 24 * 60 * 60 * 1000 + // 加4个月前
            20 * 24 * 60 * 60 * 1000;
    var range = maxTs - minTs;
    var randomRange = zh_CN_1.default.random.number({ max: range });
    // move it more towards today to account for traffic increase
    var ts = Math.sqrt(randomRange / range) * range;
    return new Date(minTs + ts);
};
exports.randomFloat = function (min, max) {
    return parseFloat(zh_CN_1.default.random.number({ min: min, max: max, precision: 0.01 }).toFixed(2));
};
