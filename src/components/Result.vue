<template>
  <v-layout justify-center class="primary">
    <v-flex xs12 sm6 v-if="loaded">
      <v-card class="secondary">
        <line-chart :chart-data="humidityChartData"></line-chart>
      </v-card>
      <v-card class="secondary">
        <line-chart :chart-data="pressureChartData"></line-chart>
      </v-card>
      <v-card class="secondary">
        <line-chart :chart-data="tempChartData"></line-chart>
      </v-card>
      <v-card class="secondary">
        <line-chart :chart-data="co2ChartData"></line-chart>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { Promise } from "bluebird";
import LineChart from "../module/lineChart.js";

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
    humidityChartData: function() {
      if (!this.loaded) return;
      return this.makeChartData("humidity");
    },
    pressureChartData: function() {
      if (!this.loaded) return;
      return this.makeChartData("pressure");
    },
    tempChartData: function() {
      if (!this.loaded) return;
      return this.makeChartData("temperature");
    },
    co2ChartData: function() {
      if (!this.loaded) return;
      const labels = this.co2.map(data => data.timestamp);
      const data = this.co2.map(data => data.co2.value);
      return {
        labels,
        datasets: [
          {
            label: "CO2",
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data
          }
        ]
      };
    }
  },
  created() {
    this.init();
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
            timestamp: env.timestamp
          });
          this.envs.pressure.push({
            pressure: env.pressure,
            timestamp: env.timestamp
          });
          this.envs.temperature.push({
            temperature: env.temp,
            timestamp: env.timestamp
          });
        });
        this.co2 = co2.data;
        this.loaded = !this.loaded;

        console.debug(this.envs, this.co2);
      });
    },
    makeChartData(dataType) {
      const labels = this.envs[dataType].map(data => data.timestamp);
      const data = this.envs[dataType].map(data => data[dataType].value);
      return {
        labels,
        datasets: [
          {
            label: dataType.toUpperCase(),
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data
          }
        ]
      };
    }
  }
};
</script>
