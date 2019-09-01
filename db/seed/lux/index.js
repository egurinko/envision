const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 300 + 600,
        timestamp: date - 60000 * (10080 - i)
    };
});