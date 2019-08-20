<template>
  <v-container class="primary">
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
              color="lightGreen"
              tile
              outlined
              medium
              data-cy="timespan-button"
              v-on="on"
            >
              <v-icon
                size="20"
                color="white"
                left
              >
                add_alarm
              </v-icon><span class="white--text">{{ $store.state.timespans.selected }}</span>
            </v-btn>
          </template>
          <v-list class="primary">
            <v-list-item
              v-for="(hours, key) in $store.state.timespans.timespan"
              :key="key"
              :data-cy="key"
              @click="onClick(key)"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="mx-3"
                  v-text="key"
                />
              </v-list-item-content>
            </v-list-item>
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
