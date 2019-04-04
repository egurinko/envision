<template>
  <v-container fluid class="primary">
    <v-layout class="primary" row>
      <v-flex grow pa-1 xs6>
        <v-card class="secondary">
          <line-chart
            v-if="loaded"
            :chart-data="humidityChartData"
          ></line-chart>
        </v-card>
      </v-flex>
      <v-flex grow pa-1 xs6>
        <v-card class="secondary">
          <line-chart
            v-if="loaded"
            :chart-data="pressureChartData"
          ></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="primary" v-if="loaded" row>
      <v-flex grow pa-1 xs6>
        <v-card xs4 class="secondary">
          <line-chart v-if="loaded" :chart-data="tempChartData"></line-chart>
        </v-card>
      </v-flex>
      <v-flex grow pa-1 xs6>
        <v-card xs4 class="secondary">
          <line-chart v-if="loaded" :chart-data="co2ChartData"></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { Promise } from "bluebird";
import LineChart from "../module/lineChart.js";
import { setInterval } from "timers";

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
    update() {
      Promise.all([
        axios.get(`${this.$store.state.domain}/envs`),
        axios.get(`${this.$store.state.domain}/co2`)
      ]).then(([envs, co2]) => {
        let envDiffs;
        let co2Diffs;
        const envsLenDiff = this.envs.humidity.length - envs.data.length;
        const co2LenDiff = this.co2.length - co2.data.length;

        if (envsLenDiff !== 0) {
          envDiffs = envs.data.slice(envsLenDiff);
        }
        if (co2LenDiff !== 0) {
          co2Diffs = co2.data.slice(co2LenDiff);
        }
        console.log("ENVS", envsLenDiff, envDiffs);
        console.log("CO2", envsLenDiff, co2Diffs);

        this.envs = {
          humidity: [],
          pressure: [],
          temperature: []
        };
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
        // this.loaded = !this.loaded;

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
<style>
.charts {
  padding: 20px;
}
</style>
