<template>
  <v-container class="primary my-1">
    <v-layout v-if="!isLoading" class="primary" row wrap justify-space-around>
      <timespan-button @on-click="onClick"></timespan-button>
      <v-flex
        v-for="(data, i) in chartData"
        :key="i"
        xs12
        sm12
        md6
        lg4
        justify-space-around
        shrink
        class="pa-3 my-3"
      >
        <v-card class="secondary" flat>
          <line-chart
            :id="data.datasets[0].id"
            :chart-data="data"
            :title="data.datasets[0].label"
            :annotation="annotations[data.datasets[0].label]"
          ></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import LineChart from "../module/lineChart.js";
import TimespanButton from "./common/TimespanButton";
import convertTime from "../module/convertTime.js";
import { mapState } from "vuex";

export default {
  components: {
    LineChart,
    TimespanButton
  },
  data() {
    return {
      envs: null
    };
  },
  computed: {
    chartData: function() {
      if (this.envs === null) return;
      const chartData = [];
      for (let i in this.envs) {
        chartData.push(this.makeChartData(this.envs[i].data, this.envs[i].key));
      }
      return chartData;
    },
    ...mapState({
      annotations: state => state.annotations,
      isLoading: state => state.isLoading
    })
  },
  created() {
    this.init();
    setInterval(() => {
      this.update();
    }, 60000);
  },
  methods: {
    init() {
      this.$store.commit("setIsLoading", true);

      axios
        .get(`${this.$store.state.domain}/envs`, {
          params: {
            timespan: this.$store.getters.getTimespan
          }
        })
        .then(envs => {
          this.envs = envs.data.map(env => {
            let timeConvetedData = env.data;
            if (env.data.length !== 0) {
              timeConvetedData = env.data.map(each => {
                return {
                  value: each.value,
                  time: convertTime(each.timestamp)
                };
              });
            }
            return { key: env.key, data: timeConvetedData };
          });
        })
        .finally(error => {
          this.$store.commit("setIsLoading", false);
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
    onClick() {
      this.init();
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
<style scoped>
.timespan {
  float: left;
}
</style>
