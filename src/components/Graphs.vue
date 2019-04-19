<template>
  <v-container class="primary my-1" v-if="loaded">
    <v-layout class="primary" row wrap justify-space-around>
      <v-flex xs12 class="pa-3 my-3">
        <div class="text-lg-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                {{ selectedTimespan }}
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in timespan"
                :key="index"
                @click="onClick(index)"
              >
                <v-list-tile-title>{{ item }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </v-flex>
      <v-flex
        xs12
        sm12
        md6
        lg4
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
      envs: null,
      timespan: ["AN HOUR", "3 HOURS", "DAILY"],
      selectedTimespan: "AN HOUR"
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
    init(params = 3600000) {
      axios
        .get(`${this.$store.state.domain}/envs`, {
          params: { timespan: params }
        })
        .then(envs => {
          this.envs = envs.data.map(env => {
            let timeConvetedData = env.data;
            if (env.data.length !== 0) {
              timeConvetedData = env.data.map(each => {
                return { value: each.value, time: convertTime(each.timestamp) };
              });
            }
            return { key: env.key, data: timeConvetedData };
          });
          this.loaded = !this.loaded;
        });
    },
    update() {
      axios.get(`${this.$store.state.domain}/envs`).then(envs => {
        envs.data.map((env, i) => {
          const newLen = env.data.length;
          if (newLen !== 0) {
            const newTimestamp = convertTime(env.data[newLen - 1].timestamp);

            const oldLen = this.envs[i].data.length;
            const oldTimestamp = this.envs[i].data[oldLen - 1].time;
            if (newTimestamp !== oldTimestamp) {
              this.envs[i].data.push({
                value: env.data[newLen - 1].value,
                time: convertTime(env.data[newLen - 1].timestamp)
              });
              this.envs[i].data.shift();
            }
          }
        });
      });
    },
    onClick(index) {
      this.selectedTimespan = this.timespan[index];
      const unixTime =
        index === 0 ? 3600000 : index === 1 ? 3600000 * 3 : 3600000 * 24;
      this.init(unixTime);
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
