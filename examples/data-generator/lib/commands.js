"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN_1 = require("faker/locale/zh_CN");
var sub_days_1 = __importDefault(require("date-fns/sub_days"));
var utils_1 = require("./utils");
exports.default = (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = sub_days_1.default(today, 30);
    var sum = 0;
    return Array.from(Array(20000).keys()).map(function (id) {
        var nbProducts = utils_1.weightedArrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        var basket = Array.from(Array(nbProducts).keys()).map(function () { return ({
            product_id: zh_CN_1.random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: utils_1.weightedArrayElement([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }); });
        var pay_channel = utils_1.weightedArrayElement(['易宝支付', '支付宝'], [96, 4]);
        var proxy = utils_1.weightedArrayElement(['夏宇', '啥游', '凡得', '淘卡'], [22, 18, 7, 53]);
        var game_name = utils_1.weightedArrayElement(['牛牛', '临海麻将', '斗地主', '捕鱼', '双扣', '缙云麻将', '其他'], [89, 3, 1, 3, 1, 2, 1]);
        var amount = utils_1.weightedArrayElement([10, 20, 50, 100, 200, 500, 1000, 2000], [20, 30, 10, 18, 10, 10, 1, 1]);
        var total_ex_taxes = basket.reduce(function (total, product) {
            return total +
                db.products[product.product_id].price * product.quantity;
        }, 0);
        var delivery_fees = utils_1.randomFloat(3, 8);
        var tax_rate = zh_CN_1.random.arrayElement([0.12, 0.17, 0.2]);
        var taxes = parseFloat(((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2));
        var customer = zh_CN_1.random.arrayElement(db.customers.filter(function (customer) { return customer.has_ordered; }));
        var date = utils_1.randomDate(customer.first_seen, customer.last_seen);
        // const status =
        //     isAfter(date, aMonthAgo) && random.boolean()
        //         ? 'ordered'
        //         : weightedArrayElement(['delivered', 'cancelled'], [1000, 1]);
        var status = 'delivered';
        sum += amount;
        return {
            id: id,
            reference: zh_CN_1.random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            chain_id: zh_CN_1.random.alphaNumeric(6).toUpperCase(),
            pay_channel: pay_channel,
            basket: basket,
            game_name: game_name,
            proxy: proxy,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            amount: amount,
            sum: sum,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat((total_ex_taxes + delivery_fees + taxes).toFixed(2)),
            status: status,
        };
    });
});
