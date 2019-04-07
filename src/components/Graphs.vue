<template>
  <v-container class="primary my-1" v-if="loaded">
    <v-layout class="primary" row wrap justify-space-around>
      <v-flex
        xs12
        sm12
        md6
        justify-space-around
        shrink
        class="pa-3 my-3"
        v-for="(data, i) in chartData"
        :key="i"
      >
        <v-card class="secondary" flat>
          <line-chart
            :chart-data="data"
            :title="data.datasets[0].label"
            :id="data.datasets[0].id"
          ></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import LineChart from "../module/lineChart.js";
import convertTime from "../module/convertTime.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      loaded: false,
      envs: {
        humidity: [],
        pressure: [],
        temperature: []
      },
      co2: null
    };
  },
  computed: {
    chartData: function() {
      if (!this.loaded) return;
      const chartData = [];
      chartData.push(this.makeChartData("humidity"));
      chartData.push(this.makeChartData("pressure"));
      chartData.push(this.makeChartData("temperature"));

      let labels = [];
      let data = [];
      const id = this.co2[0].co2.unit;
      this.co2.map(co2 => {
        labels.push(co2.timestamp);
        data.push(co2.co2.value);
      });
      const co2ChartData = {
        labels,
        datasets: [
          {
            label: "CO2",
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data,
            id
          }
        ]
      };
      chartData.push(co2ChartData);
      return chartData;
    }
  },
  created() {
    this.init();
    setInterval(() => {
      this.update();
    }, 60000);
  },
  methods: {
    init() {
      Promise.all([
        axios.get(`${this.$store.state.domain}/envs`),
        axios.get(`${this.$store.state.domain}/co2`)
      ]).then(([envs, co2]) => {
        envs.data.map(env => {
          this.envs.humidity.push({
            humidity: env.hum,
            timestamp: convertTime(env.timestamp)
          });
          this.envs.pressure.push({
            pressure: env.pressure,
            timestamp: convertTime(env.timestamp)
          });
          this.envs.temperature.push({
            temperature: env.temp,
            timestamp: convertTime(env.timestamp)
          });
        });
        this.co2 = co2.data.map(data => {
          return {
            co2: data.co2,
            timestamp: convertTime(data.timestamp)
          };
        });
        this.loaded = !this.loaded;

        console.debug(this.envs, this.co2);
      });
    },
    update() {
      Promise.all([
        axios.get(`${this.$store.state.domain}/envs`),
        axios.get(`${this.$store.state.domain}/co2`)
      ]).then(([envs, co2]) => {
        const len = this.co2.length;
        const newTimestamp = convertTime(envs.data[len - 1].timestamp);
        const lastTimestamp = this.envs.humidity[len - 1].timestamp;
        if (newTimestamp !== lastTimestamp) {
          this.envs.humidity.push({
            humidity: envs.data[len - 1].hum,
            timestamp: newTimestamp
          });
          this.envs.pressure.push({
            pressure: envs.data[len - 1].pressure,
            timestamp: newTimestamp
          });
          this.envs.temperature.push({
            temperature: envs.data[len - 1].temp,
            timestamp: newTimestamp
          });
          this.envs.humidity.shift();
          this.envs.pressure.shift();
          this.envs.temperature.shift();
        }

        const newCo2Timestamp = convertTime(co2.data[len - 1].timestamp);
        const lastCo2Timestamp = this.co2.timestamp;
        if (newCo2Timestamp !== lastCo2Timestamp) {
          this.co2.push({
            co2: co2.data[len - 1].co2,
            timestamp: newCo2Timestamp
          });
          this.co2.shift();
        }
      });
    },
    makeChartData(dataType) {
      let labels = [];
      let data = [];
      const id = this.envs[dataType][0][dataType].unit;
      this.envs[dataType].map(env => {
        labels.push(env.timestamp);
        data.push(env[dataType].value);
      });
      return {
        labels,
        datasets: [
          {
            label: dataType.toUpperCase(),
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data,
            id
          }
        ]
      };
    }
  }
};
</script>
