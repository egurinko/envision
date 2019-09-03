<template>
  <v-container class="primary">
    <v-layout
      class="primary"
      justify-center
      row
    >
      <v-card
        class="secondary"
        :class="{ card: isPhone }"
        elevation="0"
      >
        <Response />
        <v-container class="secondary">
          <v-layout
            class="secondary"
            align-center
            column
          >
            <v-flex
              xs4
              class="mt-4 mb-4"
            >
              <div class="title font-weight-bold lightGreen--text">
                Login to your account.
              </div>
            </v-flex>
            <v-flex
              xs4
              class="mt-4 mb-4 login-form"
            >
              <v-form v-model="usernameValid">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  :counter="10"
                  autocomplete="off"
                  label="Username"
                  required
                  data-cy="username"
                />
              </v-form>
            </v-flex>
            <v-flex
              xs4
              class="ma-3 mb-5 login-form"
            >
              <v-form v-model="pwValid">
                <v-text-field
                  v-model="password"
                  :append-icon="isShow ? 'visibility' : 'visibility_off'"
                  :rules="[pwRules.required, pwRules.min]"
                  :type="isShow ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  autocomplete="off"
                  label="Password"
                  data-cy="password"
                  @click:append="isShow = !isShow"
                />
              </v-form>
            </v-flex>
            <v-flex
              xs4
              class="mx-3 mt-5"
            >
              <v-btn
                color="lightGreen"
                tile
                outlined
                large
                :disabled="!usernameValid || !pwValid"
                class="login-button"
                data-cy="login-button"
                @click="login"
              >
                <span
                  :class="{ 'login-button-word': usernameValid && pwValid }"
                >Login</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
    <v-layout
      class="primary"
      column
      justify-space-around
      align-center
    >
      <v-flex class="mt-5">
        <v-divider class="divider" />
      </v-flex>
      <v-flex class="mt-4">
        <router-link
          to="/users/new"
          class="link"
        >
          Add new users to ENVISION?
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosRequestConfig } from "axios";
import { setCookie } from "../utils/controllCookie";
import callAPI from "../utils/callAPI";
import Response from "../components/Response.vue";

type Rule = (v: string) => string | boolean;
type Match = () => string;

type Data = {
  usernameValid: boolean;
  pwValid: boolean;
  username: string;
  password: string;
  isShow: boolean;
  usernameRules: Rule[],
  pwRules: {
    required: Rule;
    min: Rule;
    emailMatch: Match;
  }
}

export default Vue.extend({
  name: "Login",
  components: {
    Response
  },
  data: (): Data => ({
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
  }),
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    }
  },
  methods: {
    async login(): Promise<void> {
      const data = {
        username: this.username,
        password: this.password
      };
      const loginRequest: AxiosRequestConfig[] = [
        {
          url: "/auth/login",
          method: "POST",
          data: data
        }
      ];

      const [loginResponse] = await callAPI(loginRequest);
      if (this.$store.getters["response/getResponse"].status === 200) {
        if (loginResponse.auth) {
          this.$store.dispatch("user/setIsLoggedIn", true);
          this.$store.dispatch("user/setUsername", loginResponse.username);
          setCookie(loginResponse.token, loginResponse.username);
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
        }
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.card {
  width: 320px;
}
.login-form {
  width: 300px;
}
.login-button {
  width: 130px;
}
.login-button-word {
  color: white;
}
.link {
  color: white;
}
.divider {
  width: 400px;
}
</style>
