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
            :annotation="$store.state.annotations[data.datasets[0].label]"
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
      envs: null
    };
  },
  computed: {
    chartData: function() {
      if (!this.loaded) return;
      const chartData = [];
      for (let i in this.envs) {
        chartData.push(this.makeChartData(this.envs[i].data, this.envs[i].key));
      }
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
      Promise.all([axios.get(`${this.$store.state.domain}/envs`)]).then(
        ([envs]) => {
          this.envs = envs.data.map(env => {
            const data = env.data.map(each => {
              return {
                value: each.value,
                time: convertTime(each.timestamp)
              };
            });
            return {
              key: env.key,
              data
            };
          });
          this.loaded = !this.loaded;
        }
      );
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
          this.envs.lux.push({
            lux: envs.data[len - 1].lux,
            timestamp: newTimestamp
          });
          this.envs.humidity.shift();
          this.envs.lux.shift();
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
    makeChartData(data, key) {
      return {
        labels: data.map(each => each.time),
        datasets: [
          {
            label: key.toUpperCase(),
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data: data.map(env => env.value),
            id: key
          }
        ]
      };
    }
  }
};
</script>
