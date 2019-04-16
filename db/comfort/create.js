const callDB = require("../module/callDB");

module.exports = () => {
  return async () => {
    const envData = await callDB("GET", "envs", "latest");
    const co2Data = await callDB("GET", "co2", "latest");

    const initialPoint = 1;

    let tempIndex = 1;
    if (envData[0].temp) {
      const maxGoodTemp = 24;
      const minGoodTemp = 22;
      const currentTemp = Number(envData[0].temp.value);
      tempIndex =
        currentTemp > maxGoodTemp
          ? initialPoint - (currentTemp - maxGoodTemp) / 15
          : currentTemp < minGoodTemp
          ? initialPoint - (minGoodTemp - currentTemp) / 15
          : initialPoint;
    }

    let humIndex = 1;
    if (envData[0].hum) {
      const maxGoodHum = 60;
      const minGoodHum = 40;
      const currentHum = Number(envData[0].hum.value);
      humIndex =
        currentHum > maxGoodHum
          ? initialPoint - (currentHum - maxGoodHum) / 25
          : currentHum < minGoodHum
          ? initialPoint - (minGoodHum - currentHum) / 25
          : initialPoint;
    }

    let pressureIndex = 1;
    if (envData[0].pressure) {
      const maxGoodPressure = 990;
      const currentPressure = Number(envData[0].pressure.value);
      pressureIndex =
        currentPressure < maxGoodPressure
          ? initialPoint - (maxGoodPressure - currentPressure) / 5
          : initialPoint;
    }

    let co2Index = 1;
    if (co2Data[0].co2) {
      const maxGoodCo2 = 700;
      const currentCo2 = Number(co2Data[0].co2.value);
      co2Index =
        currentCo2 > maxGoodCo2
          ? initialPoint - (currentCo2 - maxGoodCo2) / 2500
          : initialPoint;
    }

    let luxIndex = 1;
    if (envData[0].lux) {
      const maxGoodLux = 1800;
      const minGoodLux = 1300;
      const currentLux = Number(envData[0].lux.value);
      luxIndex =
        currentLux > maxGoodLux
          ? initialPoint - (currentLux - maxGoodLux) / 2000
          : currentLux < minGoodLux
          ? initialPoint - (minGoodLux - currentLux) / 2000
          : initialPoint;
    }

    const data = {
      timestamp: co2Data[0].timestamp,
      comfortIndex: tempIndex * humIndex * pressureIndex * co2Index * luxIndex,
      detail: [
        { label: "室温快適度", value: tempIndex },
        { label: "CO2快適度", value: co2Index },
        { label: "照度快適度", value: luxIndex },
        { label: "湿度快適度", value: humIndex },
        { label: "気圧快適度", value: pressureIndex }
      ]
    };
    await callDB("POST", "comfort", data);

    return data;
  };
};
