<template>
  <div
    v-if="loaded"
    class="primary home"
    :class="{
      'py-0': state.isPhone,
      'ma-3': state.isPhone,
      'pa-5': !state.isPhone
    }"
  >
    <v-container>
      <v-layout row wrap justify-center align-center>
        <!-- <v-flex xs3 v-if="!state.isPhone">
          <div></div>
        </v-flex> -->
        <v-flex xs8 class="px-3">
          <doughnut-chart
            :chart-data="comfortChartData"
            class="px-1 prod-chart"
            title="総合快適度指数"
          ></doughnut-chart>
        </v-flex>
        <!-- <v-flex xs3 v-if="!state.isPhone">
          <div></div>
        </v-flex> -->
      </v-layout>
    </v-container>

    <v-card class="secondary details" flat>
      <v-container class="my-1">
        <v-layout
          row
          wrap
          justify-space-between
          align-center
          :class="{
            'detail-phone': state.isPhone,
            'py-2': state.isPhone,
            'pa-3': !state.isPhone
          }"
          v-for="(data, i) in detailData"
          :key="i"
        >
          <v-flex xs6 sm3>
            <div class="detail-left">{{ data.label }}</div>
          </v-flex>
          <v-flex xs0 sm3 v-if="!state.isPhone">
            <div class="detail-center">・・・・・・></div>
          </v-flex>
          <v-flex xs6 sm3>
            <div class="detail-right">{{ data.value }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import doughnutChart from "../module/doughnutChart.js";

export default {
  components: {
    doughnutChart
  },
  data() {
    return {
      loaded: false,
      latestEnv: null,
      latestCo2: null,
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
          label: data.label,
          value: `${Math.floor(data.value * 100 * 100) / 100}%`
        };
      });
    },
    comfortChartData: function() {
      if (!this.loaded) return;
      const comfort = this.comfort[this.comfort.length - 1].comfortIndex;
      const data = [comfort, 1 - comfort];
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
        axios.get(`${this.$store.state.domain}/comfort`),
        axios.get(`${this.$store.state.domain}/envs`),
        axios.get(`${this.$store.state.domain}/co2`)
      ]).then(([comfort, envs, co2]) => {
        this.comfort = comfort.data;
        this.latestEnv = envs.data[envs.data.length - 1];
        this.latestCo2 = co2.data[co2.data.length - 1];
        this.loaded = true;
      });
    },
    update() {
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
  border-left: solid 7px #08b97f;
  padding: 10px;
  padding-left: 30px;
  margin-left: 20px;
}
.detail-center {
  color: gray;
}
.detail-right {
  margin: 0 auto 0 auto;
}
.detail-phone {
  font-size: 14px;
}
</style>
