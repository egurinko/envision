<template>
  <v-container class="primary my-1">
    <v-layout
      row
      wrap
      justify-space-around
    >
      <v-flex
        xs12
        class="timespan"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              class="lightGreen"
              dark
              outlined
              v-on="on"
            >
              <v-icon
                size="20"
                color="white"
                left
              >
                add_alarm
              </v-icon>{{ $store.state.timespans.selected }}
            </v-btn>
          </template>
          <v-list class="primary">
            <v-list-tile
              v-for="(hours, key) in $store.state.timespans.timespan"
              :key="key"
              @click="onClick(key)"
            >
              <v-list-item-title>{{ key }}</v-list-item-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "TimespanButton",
  methods: {
    onClick(hours) {
      if (
        this.$store.state.timespans.selected ===
        this.$store.state.timespans.timespan[hours]
      ) {
        return;
      }

      this.$store.commit("changeTimespan", hours);
      this.$emit("on-click");
    }
  }
};
</script>
<style scoped>
.timespan {
  float: left;
}
</style>
