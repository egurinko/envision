<template>
  <v-container class="primary">
    <v-layout
      class="primary"
      row
      align-center
      justify-center
    >
      <v-flex
        v-for="(item, index) in reputations"
        :key="index"
        xs5
        class="ml-3"
      >
        <v-btn
          class="ma-3 ml-5"
          icon
          large
          :data-cy="item.icon"
          @click="handleReputations(index)"
        >
          <v-icon
            x-large
            :color="item.icon === 'mood' ? 'lightGreen' : 'lightCritical'"
          >
            {{ item.icon }}
          </v-icon>
        </v-btn>
        <v-list-item-title class="drawer-title pr-2">
          {{
            item.title
          }}
        </v-list-item-title>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import callAPI from "../utils/callAPI";
import axios, { AxiosRequestConfig } from "axios";
import domain from "../utils/domain";

type Reputation = {
  icon: string;
  title: string;
}

type Data = {
  reputations: Reputation[]
}

export default Vue.extend({
  name: "Reputation",
  data: (): Data => ({
    reputations: [
        { icon: "mood", title: "Good" },
        { icon: "mood_bad", title: "Bad" }
    ]
  }),
  methods: {
    async handleReputations(index: number): Promise<void> {
      type Data = { 
        [index:string] :  number | string;
      }
      let data: Data = {};
      await axios
        .get(`${domain}/envs`, {
          params: {
            timespan: "latest"
          }
        })
        .then(latest => {
          latest.data.map((env: any): void => {
            data[env.key] = Number(env.data[0].value);
            data.teacher = this.reputations[index].title;
          });
        });

      data.username = this.$store.state.user.username;

      const requests: AxiosRequestConfig[] = [
        {
          url: "/training-data",
          method: "POST",
          data: data
        }
      ];
      await callAPI(requests);
    }
  }
});
</script>

<style scoped>
.drawer-title {
  font-size: 20px;
  text-align: center;
}
</style>
