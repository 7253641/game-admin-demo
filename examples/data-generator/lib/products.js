"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN_1 = require("faker/locale/zh_CN");
var utils_1 = require("./utils");
exports.default = (function (db) {
    var id = 0;
    return db.categories.reduce(function (acc, category) { return acc.concat(Array.from(Array(10).keys()).map(function (index) {
        var width = utils_1.randomFloat(10, 40);
        var height = utils_1.randomFloat(10, 40);
        return {
            id: id++,
            category_id: category.id,
            reference: category.name.substr(0, 2) +
                '-' +
                zh_CN_1.random.alphaNumeric(5) +
                '-' +
                zh_CN_1.random.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            width: width,
            height: height,
            price: utils_1.randomFloat((width * height) / 20, (width * height) / 15),
            thumbnail: 'https://marmelab.com/posters/' +
                category.name +
                '-' +
                (index + 1) +
                '.jpeg',
            image: 'https://marmelab.com/posters/' +
                category.name +
                '-' +
                (index + 1) +
                '.jpeg',
            description: zh_CN_1.lorem.paragraph(),
            stock: utils_1.weightedBoolean(20)
                ? 0
                : zh_CN_1.random.number({ min: 0, max: 250 }),
        };
    })); }, []);
});
