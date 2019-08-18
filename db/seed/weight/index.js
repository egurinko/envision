const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    return {
        value: Math.random() * 800 + 200,
        timestamp: date - 6000 * i 
    };
});