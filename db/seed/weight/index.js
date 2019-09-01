const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 100 + 400,
        timestamp: date - 60000 * (10080 - i)
    };
});