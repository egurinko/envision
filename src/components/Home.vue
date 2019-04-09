<template>
  <v-container class="primary my-1" v-if="loaded">
    <v-layout class="primary" row wrap justify-space-around>
      <v-flex xs12 justify-space-around class="pa-5 mb-3 mx-5">
        <v-spacer></v-spacer>
        <doughnut-chart
          :chart-data="comfortChartData"
          title="COMFORT INDEX"
        ></doughnut-chart>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex
        xs12
        sm12
        md6
        justify-space-around
        shrink
        class="pa-5 my-3"
        v-for="(data, i) in chartData"
        :key="i"
      >
        <v-card class="secondary" flat>
          <doughnut-chart
            :chart-data="data"
            :title="data.datasets[0].label"
            :id="data.datasets[0].id"
          ></doughnut-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import convertTime from "../module/convertTime.js";
import doughnutChart from "../module/doughnutChart.js";

export default {
  components: {
    doughnutChart
  },
  data() {
    return {
      loaded: false,
      envs: {
        humidity: [],
        pressure: [],
        temperature: []
      },
      co2: null,
      comfort: null
    };
  },
  computed: {
    chartData: function() {
      if (!this.loaded) return;
      const chartData = [];
      const latest = this.comfort[this.comfort.length - 1];
      for (let key in latest.detail) {
        const data = [latest.detail[key] * 4, 100 - latest.detail[key] * 4];
        chartData.push({
          datasets: [
            {
              label: key.toUpperCase(),
              backgroundColor: [
                this.$store.state.colors.lightGreen,
                this.$store.state.colors.deepGreen
              ],
              borderWidth: 0,
              borderColor: this.$store.state.colors.lightGreen,
              data
            }
          ]
        });
      }
      return chartData;
    },
    comfortChartData: function() {
      if (!this.loaded) return;
      const comfort = this.comfort[this.comfort.length - 1].comfortIndex;
      const data = [comfort, 100 - comfort];
      return {
        datasets: [
          {
            backgroundColor: [
              this.$store.state.colors.lightGreen,
              this.$store.state.colors.deepGreen
            ],
            borderWidth: 0,
            borderColor: this.$store.state.colors.lightGreen,
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
        axios.get(`${this.$store.state.domain}/co2`),
        axios.get(`${this.$store.state.domain}/comfort`)
      ]).then(([envs, co2, comfort]) => {
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

        this.comfort = comfort.data;
        this.loaded = !this.loaded;

        console.debug(this.envs, this.co2, this.comfort);
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
    }
  }
};
</script>
