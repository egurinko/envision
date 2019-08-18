const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 70 + 10,
        timestamp: date - 6000 * i 
    };
});