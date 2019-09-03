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
              </v-icon><span class="white--text">{{ selectedTimespan }}</span>
            </v-btn>
          </template>
          <v-list class="primary">
            <v-list-item
              v-for="(hours, key) in convertTimespan"
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

<script lang="ts">
import Vue from "vue";
import convertTimespan from "../utils/convertTimespan";

type Data = {
  convertTimespan: { [index:string] :  number };
}

export default Vue.extend({
  name: "TimespanButton",
  data: (): Data => ({
      convertTimespan: convertTimespan
  }),
  computed: {
    convertedTimespan: function(): number {
      return this.$store.getters["ui/getConvertedTimespan"];
    },
    selectedTimespan: function(): string {
      return this.$store.getters["ui/getSelectedTimespan"];
    }
  },
  methods: {
    onClick(hours: string): void {
      if (
        this.convertedTimespan ===
        convertTimespan[hours]
      ) {
        return;
      }
      this.$store.dispatch("ui/setTimespan", hours);
      this.$emit("on-click");
    }
  }
});
</script>
<style scoped>
.timespan {
  float: left;
}
</style>
