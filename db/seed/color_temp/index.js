const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 6000 + 2000,
        timestamp: date - 60000 * (10080 - i)
    };
});