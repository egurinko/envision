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
            :id="envs[i].key"
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

<script lang="ts">
import Vue from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import LineChart from "../components/LineChart.vue";
import TimespanButton from "../components/TimespanButton.vue";
import convertTime from "../utils/convertTime";
import Response from "../components/Response.vue";
import callAPI from "../utils/callAPI";
// @ts-ignore: Unreachable code error
import * as chatjsAnnotation from "chartjs-plugin-annotation";
import domain from "../utils/domain";
import annotations, { ChartAnnotationOptions, Annotations } from "../utils/annotations";
import Chart from "chart.js";

type OriginalEnvData = {
  _id: string;
  value: number;
  timestamp: string;
}

export type OriginalEnv =  { key: string, data: OriginalEnvData[]};

type EnvData = {
  value: number;
  time: string;
}

type Env = { key: string, data: EnvData[]};

type Data = {
  envs: Env[] | null;
  annotations: Annotations;
  chatjsAnnotation: ChartAnnotationOptions
}

export default Vue.extend({
  name: "Graphs",
  components: {
    LineChart,
    TimespanButton,
    Response
  },
  data: (): Data => ({
      envs: null,
      chatjsAnnotation,
      annotations
  }),
  computed: {
    chartData: function(): Chart.ChartData[] | undefined {
      if (this.envs === null) return;
      const chartData: Chart.ChartData[] = [];
      for (let i in this.envs) {
        chartData.push((this as any).makeChartData(this.envs[i].data, this.envs[i].key));
      }
      return chartData;
    },
    isLoading: function(): boolean {
      return this.$store.getters["ui/getIsLoading"];
    }
  },
  created(): void {
    (this as any).init();
    setInterval(() => {
      (this as any).update();
    }, 60000);
  },
  methods: {
    async init(): Promise<void> {
      const requests: AxiosRequestConfig[] = [
        {
          url: "/envs",
          method: "GET",
          params: { timespan: this.$store.getters["ui/getConvertedTimespan"] }
        }
      ];

      const [envs] = await callAPI(requests);
      if (this.$store.getters["response/getResponse"].status === 200) {
        this.envs = envs.map((env: OriginalEnv) => {
          let timeConvetedData: EnvData[] | OriginalEnvData[] = env.data;
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
    update(): void {
      axios.get(`${domain}/envs`).then((envs: AxiosResponse) => {
        envs.data.map((env: OriginalEnv, i: number) => {
          const newLen = env.data.length;
          if (newLen !== 0) {
            const newTimestamp = convertTime(env.data[newLen - 1].timestamp);

            const oldLen = this.envs![i].data.length;
            const oldTimestamp = this.envs![i].data[oldLen - 1].time;
            if (newTimestamp !== oldTimestamp) {
              this.envs![i].data.push({
                value: env.data[newLen - 1].value,
                time: convertTime(env.data[newLen - 1].timestamp)
              });
              this.envs![i].data.shift();
            }
          }
        });
      });
    },
    onClick(): void {
      (this as any).init();
    },
    makeChartData(data: EnvData[], key: string): Chart.ChartData | undefined  {
      return {
        labels: data.map(each => each.time),
        datasets: [
          {
            label: key.toUpperCase(),
            backgroundColor: this.$vuetify.theme.themes.dark.primary as string,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen as string,
            radius: 0,
            data: data.map(env => env.value)
          }
        ]
      };
    }
  }
});
</script>
<style scoped>
.graph-container {
  padding: 0 3%;
}
</style>
