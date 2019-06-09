<template>
  <v-container class="primary">
    <v-layout class="primary" row align-center justify-center>
      <v-flex v-for="(item, index) in reputations" :key="index" xs5>
        <v-btn class="ma-3" icon large @click="handleReputations(index)">
          <v-icon
            x-large
            :color="item.icon === 'mood' ? 'lightGreen' : 'lightCritical'"
          >{{ item.icon }}</v-icon>
        </v-btn>
        <v-list-tile-title class="drawer-title pl-1">{{ item.title }}</v-list-tile-title>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import callAPI from "../module/callAPI";

export default {
  data() {
    return {
      reputations: [
        { icon: "mood", title: "Good" },
        { icon: "mood_bad", title: "Bad" }
      ]
    };
  },
  computed: {},
  methods: {
    async handleReputations(index) {
      let data = {};

      const envRequest = [
        {
          url: `${this.$store.state.domain}/envs`,
          method: "GET",
          params: { timespan: "latest" }
        }
      ];

      const [envData] = await callAPI(envRequest);
      if (this.$store.state.response.status === 200) {
        envData.map(env => {
          data[env.key] = Number(env.data[0].value);
          data.teacher = this.reputations[index].title;
        });

        const requests = [
          {
            url: `${this.$store.state.domain}/training-data`,
            method: "POST",
            data: data
          }
        ];
        await callAPI(requests);
      }
    }
  }
};
</script>

<style scoped>
.drawer-title {
  font-size: 20px;
  text-align: center;
}
</style>
