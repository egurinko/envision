<template>
  <v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar-items v-for="item in items" :key="item.title">
      <v-btn icon flat
        ><v-icon size="25">{{ item.icon }}</v-icon></v-btn
      >
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      items: this.$store.state.menus
    };
  },
  methods: {
    init() {}
  }
};
</script>
