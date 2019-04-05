<template>
  <v-navigation-drawer permanent height="100%" width="250" class="primary">
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
        justify-center
        v-for="item in items"
        :key="item.title"
      >
        <v-flex xs12 class="mt-1">
          <v-list-tile-action class="list-icon">
            <v-icon x-large>{{ item.icon }}</v-icon>
          </v-list-tile-action>
        </v-flex>
        <v-flex xs12 class="mb-5 mr-3">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="space-fill"></div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: "home", title: "HOME" },
        { icon: "question_answer", title: "ANSWER" }
      ],
      right: null
    };
  },
  methods: {
    init() {}
  }
};
</script>

<style scoped>
.space-fill {
  min-height: 100vh;
}
</style>
