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
                Add new users.
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
                @click="register"
              >
                <span
                  :class="{ 'login-button-word': usernameValid && pwValid }"
                >Register</span>
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
          to="/login"
          class="link"
        >
          Already have an account?
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import callAPI from "../../utils/callAPI";
import Response from "../../components/Response";
import { mapState } from "vuex";

export default {
  name: "UsersNew",
  components: {
    Response
  },
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
  computed: {
    ...mapState({
      isPhone: state => state.isPhone
    })
  },
  methods: {
    async register() {
      const data = {
        username: this.username,
        password: this.password
      };
      const userRegistrationRequest = [
        {
          url: `${this.$store.state.domain}/auth/users`,
          method: "POST",
          data: data
        }
      ];

      const [userRegistrationResponse] = await callAPI(userRegistrationRequest);
      if (this.$store.state.response.status === 200) {
        // Something happens ?
      }
    }
  }
};
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
