<template>
  <v-container
    :v-if="!isLoading"
    class="primary container"
  >
    <Response />
    <v-layout
      row
      wrap
      justify-center
      align-center
    >
      <v-flex
        xs10
        class="px-3 pb-3"
      >
        <DoughnutChart
          :chart-data="doughnutData"
          class="px-1 prod-chart"
          title="COMFORT INDEX"
          data-cy="comfort-index"
        />
      </v-flex>
    </v-layout>

    <v-card
      class="secondary details"
      elevation="0"
    >
      <v-layout
        v-for="(data, i) in detailData"
        :key="i"
        row
        wrap
        justify-space-between
        align-center
        :class="{
          'detail-phone': isPhone,
          'py-2': isPhone,
          'pa-3': !isPhone,
          'detail-normal': data.value >= $constant.WARNING_RATIO,
          'detail-warning': data.value >= $constant.CRITICAL_RATIO,
          'detail-critical': data.value < $constant.CRITICAL_RATIO
        }"
      >
        <v-flex
          xs6
          sm6
          md4
        >
          <div
            class="detail-left"
            :class="{
              'detail-left-normal': data.value >= $constant.WARNING_RATIO,
              'detail-left-warning': data.value >= $constant.CRITICAL_RATIO,
              'detail-left-critical': data.value < $constant.CRITICAL_RATIO
            }"
            :data-cy="data.label"
          >
            {{ data.label }}
          </div>
        </v-flex>
        <v-flex
          v-if="!isTablet"
          xs0
          sm0
          md3
        >
          <div class="detail-center">
            ・・・・・・>
          </div>
        </v-flex>
        <v-flex
          xs6
          sm6
          md4
        >
          <div class="detail-right">
            {{ data.value }}{{ data.unit }}
          </div>
        </v-flex>
      </v-layout>
    </v-card>

    <timespan-button
      class="mt-3"
      data-cy="timespan"
      @on-click="onClick"
    />

    <v-card
      class="secondary"
      elevation="0"
      text
    >
      <v-layout
        justify-center
        align-center
        class="pa-3 my-3"
      >
        <v-flex xs11>
          <LineChart
            id="%"
            :chart-data="lineData"
            :title="lineData.datasets[0].label"
            :plugins="[chatjsAnnotation]"
            data-cy="comfort-graph"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosRequestConfig } from "axios";
import DoughnutChart from "../components/DoughnutChart.vue";
import LineChart from "../components/LineChart.vue";
import TimespanButton from "../components/TimespanButton.vue";
import convertTime from "../utils/convertTime";
import Response from "../components/Response.vue";
// @ts-ignore: Unreachable code error
import * as chatjsAnnotation from "chartjs-plugin-annotation";
import domain from "../utils/domain";
import { OriginalEnv } from "./Graphs.vue";
import annotations, { ChartAnnotationOptions, Annotations } from "../utils/annotations";
import Chart from "chart.js";

type DetailData = {
  label: string;
  value: number;
  unit: string;
}

type Data = {
  latestEnv: OriginalEnv[] | null;
  latestComfort: Comforts;
  comfort: Comforts;
  chatjsAnnotation: ChartAnnotationOptions;
}

type Comfort = {
  _id: string;
  timestamp: string;
  comfortIndex: number;
  detail: { 
    key :  string;
    value: number;
  } []
}

type Comforts = Comfort[] | null;

export default Vue.extend({
  name: "Home",
  components: {
    DoughnutChart,
    LineChart,
    TimespanButton,
    Response
  },
  data: (): Data =>({
      latestEnv: null,
      latestComfort: null,
      comfort: null,
      chatjsAnnotation
  }),
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    },
    isTablet: function(): boolean {
      return this.$store.getters["ui/getIsTablet"];
    },
    isLoading: function(): boolean {
      return this.$store.getters["ui/getIsLoading"];
    },
    detailData: function(): DetailData[] | undefined {
      if (!this.comfort) return;
      const latest = this.comfort[this.comfort.length - 1];
      return latest.detail.map(data => {
        return {
          label: data.key.toUpperCase(),
          value: Math.floor(data.value * 100 * 100) / 100,
          unit: "%"
        };
      });
    },
    doughnutData: function(): Chart.ChartData | undefined {
      if (!this.comfort) return;
      const comfort = this.latestComfort![this.latestComfort!.length - 1]
        .comfortIndex;
      const firstColor: string =
        comfort * 100 >= (this as any).$constant.WARNING_RATIO
          ? this.$vuetify.theme.themes.dark.lightGreen as string
          : comfort * 100 >= (this as any).$constant.CRITICAL_RATIO
          ? this.$vuetify.theme.themes.dark.lightWarning as string
          : this.$vuetify.theme.themes.dark.lightCritical as string;
      const secondColor: string =
        comfort * 100 >= (this as any).$constant.WARNING_RATIO
          ? this.$vuetify.theme.themes.dark.deepGreen as string
          : comfort * 100 >= (this as any).$constant.CRITICAL_RATIO
          ? this.$vuetify.theme.themes.dark.deepWarning as string
          : this.$vuetify.theme.themes.dark.lightWarning as string;
      return {
        datasets: [
          {
            backgroundColor: [firstColor, secondColor],
            borderWidth: 0,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen as string,
            data: [comfort, 1 - comfort]
          }
        ]
      };
    },
    lineData: function(): Chart.ChartData | undefined {
      if (!this.comfort) return;
      return {
        labels: this.comfort.map(shot => convertTime(shot.timestamp)),
        datasets: [
          {
            label: "COMFORT TRANSITION",
            backgroundColor: this.$vuetify.theme.themes.dark.primary as string,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen as string,
            radius: 0,
            data: this.comfort.map(shot => shot.comfortIndex * 100),
          }
        ]
      };
    }
  },
  async created() : Promise<void> {
    this.$store.dispatch("ui/setIsLoading", true);
    await (this as any).init();
    this.$store.dispatch("ui/setIsLoading", false);
    
    setInterval(() : void => {
      (this as any).update();
    }, 60000);
  },
  methods: {
    init() : Promise<void> {
      return Promise.all([
        axios.get(`${domain}/comfort`, {
          params: {
            timespan: this.$store.getters["ui/getConvertedTimespan"]
          }
        }),
        axios.get(`${domain}/envs`),
        axios.get(`${domain}/comfort`)
      ]).then(([comfort, envs, latestComfort]) => {
        if (comfort.data.length === 0 || envs.data.length === 0) {
          return;
        }
        this.comfort = comfort.data;
        this.latestComfort = latestComfort.data;
        this.latestEnv = envs.data[envs.data.length - 1];
        return;
      });
    },
    async update() : Promise<void> {
      await (this as any).init();
    },
    async onClick() : Promise<void> {
      this.$store.dispatch("ui/setIsLoading", true);
      await (this as any).init();
      this.$store.dispatch("ui/setIsLoading", false);
    }
  }
});
</script>
<style scoped>
.container {
  padding: 0 3%;
}
.home {
  width: 100%;
}
.prod-chart {
  max-width: 400px;
  min-width: 250px;
  margin: 0 auto 0 auto;
}
.details {
  width: 100%;
  font-size: 18px;
  text-align: center;
}
.detail-left {
  float: left;
  padding: 10px 0;
  padding-left: 30px;
  margin-left: 20px;
}
.detail-left-warning {
  border-left: solid 7px #ffdc77;
}
.detail-left-normal {
  border-left: solid 7px #08b97f;
}
.detail-left-critical {
  border-left: solid 7px #ff6851;
}
.detail-center {
  color: gray;
  font-size: 1.3vw;
}
.detail-right {
  margin: 0 20px 0 0;
  float: right;
}
.detail-warning {
  color: #ffdc77;
}
.detail-normal {
  color: white;
}
.detail-critical {
  color: #ff6851;
}
.detail-phone {
  font-size: 14px;
}
</style>
