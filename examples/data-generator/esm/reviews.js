import { random, lorem } from 'faker/locale/zh_CN';
import subDays from 'date-fns/sub_days';
import isAfter from 'date-fns/is_after';
import { randomDate, weightedArrayElement, weightedBoolean } from './utils';
export default (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = subDays(today, 30);
    var id = 0;
    var reviewers = db.customers
        .filter(function (customer) { return customer.has_ordered; })
        .filter(function () { return weightedBoolean(60); }) // only 60% of buyers write reviews
        .map(function (customer) { return customer.id; });
    return db.commands
        .filter(function (command) { return reviewers.indexOf(command.customer_id) !== -1; })
        .reduce(function (acc, command) { return acc.concat(command.basket
        .filter(function () { return weightedBoolean(40); }) // reviewers review 40% of their products
        .map(function (product) {
        var date = randomDate(command.date);
        var status = isAfter(aMonthAgo, date)
            ? weightedArrayElement(['accepted', 'rejected'], [3, 1])
            : weightedArrayElement(['pending', 'accepted', 'rejected'], [5, 3, 1]);
        return {
            id: id++,
            date: serializeDate ? date.toISOString() : date,
            status: status,
            command_id: command.id,
            product_id: product.product_id,
            customer_id: command.customer_id,
            rating: random.number({ min: 1, max: 5 }),
            comment: Array.apply(null, Array(random.number({ min: 1, max: 5 })))
                .map(function () { return lorem.sentences(); })
                .join('\n \r'),
        };
    })); }, []);
});
