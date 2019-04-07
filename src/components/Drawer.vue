<template>
  <v-navigation-drawer height="100%" width="250" class="primary" permanent>
    <v-toolbar flat class="primary mt-4 mb-2">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="drawer-title">
            PRODUCTIVITY CHECKER
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

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
        <!-- <v-flex xs12 class="pa-2">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-flex> -->
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
      right: null
    };
  },
  methods: {
    init() {},
    handleClick() {
      console.log("HELLO");
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
.list-icon:hover {
  background-color: aqua;
}
</style>
