<template>
  <v-container class="primary my-1" v-if="loaded">
    <v-layout class="primary" row wrap justify-space-around>
      <v-flex
        xs12
        sm12
        md6
        justify-space-around
        class="pa-3 my-3"
        v-for="(data, i) in chartData"
        :key="i"
      >
        <v-card class="secondary">
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
          envDiffs.map(diff => {
            this.envs.humidity.push({
              humidity: diff.hum,
              timestamp: diff.timestamp
            });
            this.envs.pressure.push({
              pressure: diff.pressure,
              timestamp: diff.timestamp
            });
            this.envs.temperature.push({
              temperature: diff.temp,
              timestamp: diff.timestamp
            });
          });
        }
        if (co2LenDiff !== 0) {
          co2Diffs = co2.data.slice(co2LenDiff);
          co2Diffs.map(diff => {
            this.co2.push(diff);
          });
        }
        console.log("ENVS", envsLenDiff, envDiffs);
        console.log("CO2", envsLenDiff, co2Diffs);

        console.debug(this.envs, this.co2);
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
<style>
.charts {
  padding: 20px;
}
</style>
