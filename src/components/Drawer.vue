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
        v-for="(item, index) in menus"
        :key="index"
        class="primary"
        column
        align-center
      >
        <v-btn
          class="ma-4"
          icon
          large
          @click="handleClick(item.route)"
        >
          <v-flex xs12>
            <v-icon x-large>
              {{ item.icon }}
            </v-icon>
          </v-flex>
        </v-btn>
      </v-layout>
    </v-container>

    <reputations />
    <div class="space-fill" />
  </v-navigation-drawer>
</template>

<script>
import Reputations from "./Reputation";

export default {
  name: "Drawer",
  components: {
    Reputations
  },
  data() {
    return {};
  },
  computed: {
    menus: function() {
      const icons = [];
      this.$router.options.routes.map(route => {
        if (route.meta) {
          icons.push({ icon: route.meta.icon, route: route.path });
        }
      });
      return icons;
    }
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
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
