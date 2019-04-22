<template>
  <div
    v-if="loaded"
    class="primary home"
    :class="{
      'py-0': state.isPhone,
      'ma-3': state.isPhone,
      'pa-4': !state.isPhone
    }"
  >
    <v-container>
      <v-layout row wrap justify-center align-center>
        <v-flex xs10 class="px-3">
          <doughnut-chart
            :chart-data="doughnutData"
            class="px-1 prod-chart"
            title="COMFORT INDEX"
          ></doughnut-chart>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card class="secondary details" flat>
      <v-container>
        <v-layout
          v-for="(data, i) in detailData"
          :key="i"
          row
          wrap
          justify-space-between
          align-center
          :class="{
            'detail-phone': state.isPhone,
            'py-2': state.isPhone,
            'pa-3': !state.isPhone,
            'detail-normal': data.value >= $constant.WARNING_RATIO,
            'detail-warning': data.value >= $constant.CRITICAL_RATIO,
            'detail-critical': data.value < $constant.CRITICAL_RATIO
          }"
        >
          <v-flex xs6 sm6 md4>
            <div
              class="detail-left"
              :class="{
                'detail-left-normal': data.value >= $constant.WARNING_RATIO,
                'detail-left-warning': data.value >= $constant.CRITICAL_RATIO,
                'detail-left-critical': data.value < $constant.CRITICAL_RATIO
              }"
            >
              {{ data.label }}
            </div>
          </v-flex>
          <v-flex v-if="!state.isTablet" xs0 sm0 md3>
            <div class="detail-center">・・・・・・></div>
          </v-flex>
          <v-flex xs6 sm6 md4>
            <div class="detail-right">{{ data.value }}{{ data.unit }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <timespan-button class="mt-3" @on-click="onClick"></timespan-button>

    <v-card class="secondary" flat>
      <v-container class="pa-3 my-3">
        <v-layout justify-center align-center>
          <v-flex xs11>
            <line-chart
              :id="lineData.datasets[0].id"
              :chart-data="lineData"
              :title="lineData.datasets[0].label"
            ></line-chart>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import doughnutChart from "../module/doughnutChart.js";
import LineChart from "../module/lineChart.js";
import TimespanButton from "./TimespanButton.vue";
import convertTime from "../module/convertTime.js";

export default {
  components: {
    doughnutChart,
    LineChart,
    TimespanButton
  },
  data() {
    return {
      loaded: false,
      latestEnv: null,
      comfort: null,
      state: this.$store.state
    };
  },
  computed: {
    detailData: function() {
      if (!this.loaded) return;
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
      if (!this.loaded) return;
      const comfort = this.comfort[this.comfort.length - 1].comfortIndex;
      const firstColor =
        comfort * 100 >= this.$constant.WARNING_RATIO
          ? this.state.colors.lightGreen
          : comfort * 100 >= this.$constant.CRITICAL_RATIO
          ? this.state.colors.lightWarning
          : this.state.colors.lightCritical;
      const secondColor =
        comfort * 100 >= this.$constant.WARNING_RATIO
          ? this.state.colors.deepGreen
          : comfort * 100 >= this.$constant.CRITICAL_RATIO
          ? this.state.colors.deepWarning
          : this.state.colors.lightWarning;
      return {
        datasets: [
          {
            backgroundColor: [firstColor, secondColor],
            borderWidth: 0,
            borderColor: this.$store.state.colors.lightGreen,
            data: [comfort, 1 - comfort]
          }
        ]
      };
    },
    lineData: function() {
      if (!this.loaded) return;
      return {
        labels: this.comfort.map(shot => convertTime(shot.timestamp)),
        datasets: [
          {
            label: "COMFORT TRANSITION",
            backgroundColor: this.$store.state.colors.primary,
            borderColor: this.$store.state.colors.lightGreen,
            radius: 0,
            data: this.comfort.map(shot => shot.comfortIndex * 100),
            id: "%"
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
        axios.get(`${this.$store.state.domain}/comfort`, {
          params: {
            timespan: this.$store.getters.getTimespan
          }
        }),
        axios.get(`${this.$store.state.domain}/envs`)
      ]).then(([comfort, envs]) => {
        if (comfort.data.length === 0 || envs.data.length === 0) {
          return;
        } else {
          this.comfort = comfort.data;
          this.latestEnv = envs.data[envs.data.length - 1];
          this.loaded = true;
        }
      });
    },
    update() {
      this.init();
    },
    onClick() {
      this.init();
    }
  }
};
</script>
<style scoped>
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
