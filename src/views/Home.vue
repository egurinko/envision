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
            :id="lineData.datasets[0].id"
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

<script>
import axios from "axios";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import TimespanButton from "../components/TimespanButton";
import convertTime from "../utils/convertTime";
import Response from "../components/Response";
import * as chatjsAnnotation from "chartjs-plugin-annotation";
import domain from "../utils/domain";

export default {
  name: "Home",
  components: {
    DoughnutChart,
    LineChart,
    TimespanButton,
    Response
  },
  data() {
    return {
      latestEnv: null,
      comfort: null,
      state: this.$store.state,
      chatjsAnnotation
    };
  },
  computed: {
    isPhone: function() {
      return this.$store.getters["ui/getIsPhone"];
    },
    isTablet: function() {
      return this.$store.getters["ui/getIsTablet"];
    },
    isLoading: function() {
      return this.$store.getters["ui/getIsLoading"];
    },
    detailData: function() {
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
    doughnutData: function() {
      if (!this.comfort) return;
      const comfort = this.latestComfort[this.latestComfort.length - 1]
        .comfortIndex;
      const firstColor =
        comfort * 100 >= this.$constant.WARNING_RATIO
          ? this.$vuetify.theme.themes.dark.lightGreen
          : comfort * 100 >= this.$constant.CRITICAL_RATIO
          ? this.$vuetify.theme.themes.dark.lightWarning
          : this.$vuetify.theme.themes.dark.lightCritical;
      const secondColor =
        comfort * 100 >= this.$constant.WARNING_RATIO
          ? this.$vuetify.theme.themes.dark.deepGreen
          : comfort * 100 >= this.$constant.CRITICAL_RATIO
          ? this.$vuetify.theme.themes.dark.deepWarning
          : this.$vuetify.theme.themes.dark.lightWarning;
      return {
        datasets: [
          {
            backgroundColor: [firstColor, secondColor],
            borderWidth: 0,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen,
            data: [comfort, 1 - comfort]
          }
        ]
      };
    },
    lineData: function() {
      if (!this.comfort) return;
      return {
        labels: this.comfort.map(shot => convertTime(shot.timestamp)),
        datasets: [
          {
            label: "COMFORT TRANSITION",
            backgroundColor: this.$vuetify.theme.themes.dark.primary,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen,
            radius: 0,
            data: this.comfort.map(shot => shot.comfortIndex * 100),
            id: "%"
          }
        ]
      };
    }
  },
  async created() {
    this.$store.commit("ui/setIsLoading", true);
    await this.init();
    this.$store.commit("ui/setIsLoading", false);

    setInterval(() => {
      this.update();
    }, 60000);
  },
  methods: {
    init() {
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
    async update() {
      await this.init();
    },
    async onClick() {
      this.$store.commit("ui/setIsLoading", true);
      await this.init();
      this.$store.commit("ui/setIsLoading", false);
    }
  }
};
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
