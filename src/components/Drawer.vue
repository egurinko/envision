<template>
  <v-navigation-drawer height="100%" width="250" class="primary" permanent>
    <v-container class="primary">
      <v-layout class="primary" row align-center>
        <v-flex xs4 class="ma-2">
          <v-img width="50" height="50" :src="require('../assets/logo2.png')" />
        </v-flex>
        <v-flex xs8>
          <v-list-tile-title class="drawer-title">
            ENVISION
          </v-list-tile-title>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="primary">
      <v-layout
        class="primary"
        column
        align-center
        v-for="(item, i) in items"
        :key="item.title"
      >
        <v-btn @click="handleClick(i)" class="ma-4" icon large>
          <v-flex xs12>
            <v-list-tile-action>
              <v-icon x-large>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </v-flex>
        </v-btn>
      </v-layout>
    </v-container>
    <div class="space-fill"></div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: !this.$store.state.isPhone,
      items: this.$store.state.menus,
      right: null,
      logoSrc: { src: "./assets/logo2.png" }
    };
  },
  methods: {
    init() {},
    handleClick(e) {
      const route = this.items[e].title.toLowerCase();
      this.$router.push(`/${route}`);
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
}
</style>
