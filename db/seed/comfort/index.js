const date = new Date().getTime();

module.exports = Array(10080).fill().map((v, i) => {
    const snack = Math.random() * 0.3 + 0.7;
    const co2 = Math.random() * 0.3 + 0.7;
    const temperature = Math.random() * 0.3 + 0.7;
    const lux = Math.random() * 0.05 + 0.95;
    const humidity = Math.random() * 0.2 + 0.8;
    const pressure = Math.random() * 0.05 + 0.95;
    return {
        comfortIndex: snack * co2 * temperature * lux * humidity * pressure,
        timestamp: date - 6000 * i,
        detail: [
            {
                "key" : "snack",
                "value" : snack
            },
            {
                "key" : "co2",
                "value" : co2
            },
            {
                "key" : "temperature",
                "value" : temperature
            },
            {
                "key" : "lux",
                "value" : lux
            },
            {
                "key" : "humidity",
                "value" : humidity
            },
            {
                "key" : "pressure",
                "value" : pressure
            }
        ]
    };
});