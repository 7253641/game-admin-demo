import { random } from 'faker/locale/zh_CN';
import isAfter from 'date-fns/is_after';
import subDays from 'date-fns/sub_days';

import {
    randomDate,
    randomFloat,
    weightedArrayElement,
    weightedBoolean,
} from './utils';

export default (db, { serializeDate }) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);
    var sum = 0;
    return Array.from(Array(20000).keys()).map(id => {
        const nbProducts = weightedArrayElement(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]
        );
        const basket = Array.from(Array(nbProducts).keys()).map(() => ({
            product_id: random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: weightedArrayElement([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }));

        const pay_channel = weightedArrayElement(
            ['易宝支付', '支付宝'],
            [96, 4]
        );
        const proxy = weightedArrayElement(
            ['夏宇', '啥游', '凡得', '淘卡'],
            [22, 18, 7, 53]
        );
        const game_name = weightedArrayElement(
            ['牛牛', '临海麻将', '斗地主', '捕鱼', '双扣', '缙云麻将', '其他'],
            [89, 3, 1, 3, 1, 2, 1]
        );

        const amount = weightedArrayElement(
            [10, 20, 50, 100, 200, 500, 1000, 2000],
            [20, 30, 10, 18, 10, 10, 1, 1]
        );

        const total_ex_taxes = basket.reduce(
            (total, product) =>
                total +
                db.products[product.product_id].price * product.quantity,
            0
        );

        const delivery_fees = randomFloat(3, 8);
        const tax_rate = random.arrayElement([0.12, 0.17, 0.2]);
        const taxes = parseFloat(
            ((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2)
        );
        const customer = random.arrayElement(
            db.customers.filter(customer => customer.has_ordered)
        );
        const date = randomDate(customer.first_seen, customer.last_seen);
        // const status =
        //     isAfter(date, aMonthAgo) && random.boolean()
        //         ? 'ordered'
        //         : weightedArrayElement(['delivered', 'cancelled'], [1000, 1]);
        const status = 'delivered';

        sum += amount;
        return {
            id,
            reference: random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            chain_id: random.alphaNumeric(6).toUpperCase(),
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
            total: parseFloat(
                (total_ex_taxes + delivery_fees + taxes).toFixed(2)
            ),
            status: status,
            // returned: status === 'delivered' ? weightedBoolean(94) : false,
        };
    });
};
