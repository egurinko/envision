<template>
  <v-container class="primary">
    <v-layout class="primary" justify-center row>
      <v-card class="secondary" flat style="width: 400px;">
        <v-container class="secondary">
          <v-layout class="secondary" align-center column>
            <v-flex xs4 class="mt-4 mb-4 login-form">
              <v-form v-model="usernameValid">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  :counter="10"
                  browser-autocomplete="off"
                  label="Username"
                  required
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex xs4 class="ma-3 mb-5 login-form">
              <v-form v-model="pwValid">
                <v-text-field
                  v-model="password"
                  :append-icon="isShow ? 'visibility' : 'visibility_off'"
                  :rules="[pwRules.required, pwRules.min]"
                  :type="isShow ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  browser-autocomplete="off"
                  label="Password"
                  @click:append="isShow = !isShow"
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex xs4 class="mx-3 mt-5">
              <v-btn
                color="lightGreen"
                flat
                dark
                outline
                large
                :disabled="!usernameValid || !pwValid"
                class="login-button"
                @click="login"
                ><span
                  :class="{ 'login-button-word': usernameValid && pwValid }"
                  >Login</span
                ></v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      usernameValid: false,
      pwValid: false,
      username: "",
      password: "",
      isShow: false,
      usernameRules: [
        v => !!v || "Username is required",
        v => v.length <= 10 || "Username must be less than 10 characters"
      ],
      pwRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {},
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password
      };
      await axios
        .post(`${this.$store.state.domain}/auth/login`, data)
        .then(res => {
          const auth = res.data;
          if (auth.auth) {
            this.$store.commit("setAuth", {
              username: auth.username,
              token: auth.token
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-form {
  width: 300px;
}
.login-button {
  width: 130px;
}
.login-button-word {
  color: white;
}
</style>
