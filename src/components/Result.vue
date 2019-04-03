<template>
  <v-layout justify-center class="secondary">
    <v-flex xs12 sm6>
      <v-card>
        <v-card>
          <line-chart></line-chart>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { Promise } from "bluebird";
import LineChart from "../module/lineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      envs: null,
      co2: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([
        axios.get(`${this.$store.state.domain}/envs`),
        axios.get(`${this.$store.state.domain}/co2`)
      ]).then(([envs, co2]) => {
        console.log(envs, co2);
        this.envs = envs;
        this.co2 = co2;
      });
    }
  }
};
</script>
