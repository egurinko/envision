<template>
  <v-bottom-navigation
    id="bottom-navigation"
    dark
    background-color="primary"
    fixed
    grow
    :value="active"
  >
    <v-btn
      v-for="(item, index) in menus"
      :key="index"
      @click="handleClick(item.route, index)"
    >
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts">
import Vue from "vue";
import { Route } from "../router/route.types";
import { Menus } from "./Drawer.vue";

type Data = {
  active: number;
}

export default Vue.extend({
  name: "Toolbar",
  data: (): Data => ({
    active: 0
  }),
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    },
    menus: function(): Menus {
      const menus: Menus = [];
      (this.$router as any).options.routes.map((route: Route): void => {
        if (route.meta) {
          menus.push({ icon: route.meta.icon, route: route.path, name: route.name });
        }
      });
      return menus;
    }
  },
  created(): void{
    const target: number = this.menus.findIndex(menu => menu.route === this.$route.path);
    this.active = target;
  },
  methods: {
    handleClick(route: string, index: number): void {
      this.$router.push(route);
      this.active = index;
    }
  }
});
</script>
<style scoped>
#bottom-navigation {
  box-shadow: 0px -1px 2px #3c3c42;
}
</style>
