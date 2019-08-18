const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 300 + 600,
        timestamp: date - 6000 * i 
    };
});