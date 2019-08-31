<template>
  <v-container class="primary graph-container">
    <Response />
    <timespan-button @on-click="onClick" />

    <v-layout
      v-if="!isLoading"
      class="primary"
      wrap
    >
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
        <v-card
          class="secondary"
          text
          elevation="0"
        >
          <LineChart
            :id="data.datasets[0].id"
            :chart-data="data"
            :title="data.datasets[0].label"
            :annotation="annotations[data.datasets[0].label]"
            :plugins="[chatjsAnnotation]"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import LineChart from "../components/LineChart";
import TimespanButton from "../components/TimespanButton";
import convertTime from "../utils/convertTime";
import { mapState } from "vuex";
import Response from "../components/Response";
import callAPI from "../utils/callAPI";
import * as chatjsAnnotation from "chartjs-plugin-annotation";

export default {
  name: "Graphs",
  components: {
    LineChart,
    TimespanButton,
    Response
  },
  data() {
    return {
      envs: null,
      chatjsAnnotation
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
    async init() {
      const requests = [
        {
          url: `${this.$store.state.domain}/envs`,
          method: "GET",
          params: { timespan: this.$store.getters.getTimespan }
        }
      ];

      const [envs] = await callAPI(requests);
      if (this.$store.state.response.status === 200) {
        this.envs = envs.map(env => {
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
      }
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
            backgroundColor: this.$vuetify.theme.themes.dark.primary,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen,
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
.graph-container {
  padding: 0 3%;
}
</style>
