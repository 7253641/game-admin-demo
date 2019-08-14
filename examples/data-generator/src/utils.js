import faker from 'faker/locale/zh_CN';

export const weightedArrayElement = (values, weights) =>
    faker.random.arrayElement(
        values.reduce(
            (acc, value, index) =>
                acc.concat(new Array(weights[index]).fill(value)),
            []
        )
    );

export const weightedBoolean = likelyhood =>
    faker.random.number(99) < likelyhood;

export const randomDate = (minDate, maxDate) => {
    const minTs =
        minDate instanceof Date
            ? minDate.getTime()
            : Date.now() -
              2 * 365 * 24 * 60 * 60 * 1000 + // 2年前
              4 * 30 * 24 * 60 * 60 * 1000 - // 5个月前
              14 * 24 * 60 * 60 * 1000;
    // const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
    const maxTs =
        maxDate instanceof Date
            ? maxDate.getTime()
            : Date.now() -
              2 * 365 * 24 * 60 * 60 * 1000 + // 2年前
              4 * 30 * 24 * 60 * 60 * 1000 + // 加4个月前
              20 * 24 * 60 * 60 * 1000;
    const range = maxTs - minTs;
    const randomRange = faker.random.number({ max: range });
    // move it more towards today to account for traffic increase
    const ts = Math.sqrt(randomRange / range) * range;
    return new Date(minTs + ts);
};

export const randomFloat = (min, max) =>
    parseFloat(faker.random.number({ min, max, precision: 0.01 }).toFixed(2));
