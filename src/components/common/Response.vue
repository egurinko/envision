<template>
  <div class="primary pb-3">
    <v-alert
      :value="response.status === 200 && response.method !== 'GET'"
      color="lightGreen"
      icon="check_circle"
      outlined
      tile
    >
      Succeeded !
    </v-alert>

    <v-alert
      :value="response.status !== '' && response.status !== 200"
      color="lightCritical"
      icon="warning"
      outlined
      tile
    >
      {{ response.errors.errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Response",
  computed: {
    ...mapState({
      response: state => state.response
    })
  },
  created() {},
  methods: {}
};
</script>

<style></style>
