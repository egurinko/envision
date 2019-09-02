<template>
  <v-navigation-drawer
    height="100%"
    width="250"
    class="primary"
    permanent
  >
    <v-container class="primary">
      <v-layout
        class="primary"
        align-center
      >
        <v-flex
          xs4
          class="my-2 ml-2"
        >
          <v-img
            width="50"
            height="50"
            :src="require('../assets/logo2.png')"
            data-cy="logo"
            class="logo"
            @click="handleClick('/')"
          />
        </v-flex>
        <v-flex xs7>
          <v-list-item-title class="drawer-title">
            ENVISION
          </v-list-item-title>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="primary">
      <v-layout
        v-for="(menu, index) in menus"
        :key="index"
        class="primary"
        column
        align-center
      >
        <v-btn
          class="ma-4"
          icon
          large
          :data-cy="menu.icon"
          @click="handleClick(menu.route)"
        >
          <v-flex xs12>
            <v-icon x-large>
              {{ menu.icon }}
            </v-icon>
          </v-flex>
        </v-btn>
      </v-layout>
    </v-container>

    <reputations />
    <div class="space-fill" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Reputations from "./Reputation.vue";
import { Route } from "../router/route.types";

type Menu = {
  icon: string;
  route: string;
  name?: string;
}
export type Menus = Menu[]

export default Vue.extend({
  name: "Drawer",
  components: {
    Reputations
  },
  computed: {
    menus: function(): Menus {
      const menus: Menus = [];
      (this.$router as any).options.routes.map((route: Route): void => {
        if (route.meta) {
          menus.push({ icon: route.meta.icon, route: route.path });
        }
      });
      return menus;
    }
  },
  methods: {
    handleClick(route: string): void | undefined {
      if (route === this.$route.path) return;
      this.$router.push(route);
    }
  }
});
</script>

<style scoped>
.logo {
  cursor: pointer;
}
.space-fill {
  min-height: 100vh;
}
.list-icon {
  width: 250px;
}
.drawer-title {
  font-size: 20px;
  text-align: center;
}
</style>
