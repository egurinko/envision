<template>
  <v-toolbar flat>
    <v-spacer></v-spacer>
    <v-toolbar-items v-for="(item, i) in items" :key="item.title">
      <div class="spacer"></div>
      <v-btn icon flat @click="handleClick(i)"
        ><v-icon size="25">{{ item.icon }}</v-icon></v-btn
      >
      <div class="spacer"></div>
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
    init() {},
    handleClick(e) {
      const route = this.items[e].title.toLowerCase();
      this.$router.push(`/${route}`);
    }
  }
};
</script>
<style scoped>
.spacer {
  margin: 20px;
}
</style>
