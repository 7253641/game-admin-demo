"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN_1 = require("faker/locale/zh_CN");
var utils_1 = require("./utils");
exports.default = (function (db, _a) {
    var serializeDate = _a.serializeDate;
    return Array.from(Array(900).keys()).map(function (id) {
        var chain_id = zh_CN_1.random.alphaNumeric(8).toUpperCase();
        var first_seen = utils_1.randomDate();
        var last_seen = utils_1.randomDate(first_seen);
        var has_ordered = utils_1.weightedBoolean(25);
        var first_name = zh_CN_1.name.firstName();
        var last_name = zh_CN_1.name.lastName();
        var email = zh_CN_1.internet.email(first_name, last_name);
        var birthday = has_ordered ? zh_CN_1.date.past(60) : null;
        return {
            id: id,
            chain_id: chain_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: has_ordered ? zh_CN_1.address.streetName() : null,
            zipcode: has_ordered ? zh_CN_1.address.zipCode() : null,
            city: has_ordered ? zh_CN_1.address.city() : null,
            avatar: zh_CN_1.internet.avatar(),
            birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
            first_seen: serializeDate ? first_seen.toISOString() : first_seen,
            last_seen: serializeDate ? last_seen.toISOString() : last_seen,
            has_ordered: has_ordered,
            latest_purchase: null,
            has_newsletter: has_ordered ? utils_1.weightedBoolean(30) : true,
            groups: [],
            nb_commands: 0,
            total_spent: 0,
        };
    });
});
