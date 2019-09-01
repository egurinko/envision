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
<script>
export default {
  name: "Toolbar",
  data() {
    return {
      active: 0
    };
  },
  computed: {
    isPhone: function() {
      return this.$store.getters["ui/getIsPhone"];
    },
    menus: function() {
      const icons = [];
      this.$router.options.routes.map(route => {
        if (route.meta) {
          icons.push({ icon: route.meta.icon, route: route.path, name: route.name });
        }
      });
      return icons;
    }
  },
  created(){
    const target = this.menus.findIndex(menu => menu.route === this.$route.path);
    this.active = target;
  },
  methods: {
    handleClick(route, index) {
      this.$router.push(route);
      this.active = index;
    }
  }
};
</script>
<style scoped>
#bottom-navigation {
  box-shadow: 0px -1px 2px #3c3c42;
}
</style>
