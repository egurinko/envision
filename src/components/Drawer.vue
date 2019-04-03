<template>
  <v-navigation-drawer permanent height="100vh" width="250" class="primary">
    <v-toolbar flat class="primary" height="100">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="drawer-title">
            PRODUCTIVITY CHECKER
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title">
        <v-list-tile-action class="list-icon">
          <v-icon x-large>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content class="list-title">
          <v-list-tile-title class="headline">{{
            item.title
          }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "home" },
        { title: "About", icon: "question_answer" }
      ],
      right: null
    };
  },
  computed: {
    filter: () => {
      console.log("HEllo");
    }
  },
  methods: {
    init() {
      const one = "1";
      if (one === 1) {
        console.log("OK");
      } else {
        console.log("else");
      }
      return "OK";
    }
  }
};
</script>

<style>
.drawer-title {
  margin: 10px auto;
  vertical-align: middle;
}
.v-list__tile {
  display: flex;
  flex-direction: column;
}
.list-title {
  height: 20px;
}
.pt-0 > div {
  height: 100px;
}
</style>
