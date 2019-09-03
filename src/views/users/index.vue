<template>
  <v-container
    :v-if="!isLoading"
    class="primary container"
  >
    <Response />
    <v-btn
      color="lightGreen"
      tile
      outlined
      small
      @click="goUserRegistration"
    >
      <span class="registration pa-1">Register a new user</span>
    </v-btn>
    <v-layout
      row
      wrap
      justify-center
      align-start
    >
      <v-flex
        xs12
        md6
      >
        <v-card
          class="secondary user-table"
          elevation="0"
        >
          <v-layout
            v-for="(user, i) in userData"
            :key="i"
            row
            wrap
            justify-space-between
            align-center
            :class="{
              'detail-phone': isPhone,
              'py-2': isPhone,
              'pa-3': !isPhone
            }"
          >
            <v-flex xs6>
              <div
                class="detail-left"
                :class="{ 'detail-left-normal': i !== 0 }"
              >
                {{ user.username }}
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="detail-right">
                {{ user.createdAt }}
              </div>
            </v-flex>
            <v-flex
              v-if="i === 0"
              xs12
            >
              <v-divider />
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <v-card
          class="secondary contribution-card"
          elevation="0"
        >
          <BarChart
            class="px-1 contribution-chart"
            title="TRAINING DATA CONTRIBUTIONS"
            :chart-data="contributionData"
            data-cy="contribution-graph"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosRequestConfig } from "axios";
import BarChart from "../../components/BarChart.vue";
import callAPI from "../../utils/callAPI";
import Response from "../../components/Response.vue";
import makeCreatedAt from "../../utils/makeCreatedAt";
import Chart from "chart.js";

type Contribution = { 
  _id: string;
  username: string;
  timestamp: number;
}

type User = { 
  _id: string;
  username: string;
  timestamp: number;
}

interface Data  {
  users: User[] | null;
  contributions: Contribution[] | null;
};

type UserData = { 
  username: string;
  createdAt: string;
}

interface Method {
  init: () => Promise<void>;
  goUserRegistration: () => void;
}

export default Vue.extend({
  name: "UsersIndex",
  components: {
    BarChart,
    Response
  },
  data: (): Data => ({
    contributions: null,
    users: null
  }),
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    },
    isTablet: function(): boolean {
      return this.$store.getters["ui/getIsTablet"];
    },
    isLoading: function(): boolean {
      return this.$store.getters["ui/getIsLoading"];
    },
    contributionData: function(): Chart.ChartData {
      if (this.contributions === null || this.users === null) return {};
      const labels = this.users.map((user: User): string => user.username);
      const data = labels.map(() => 0);
      this.contributions.map((contribution: Contribution): void => {
        const index = labels.indexOf(contribution.username);
        data[index] += 1;
      });

      return {
        labels,
        datasets: [
          {
            borderWidth: 1,
            borderColor: this.$vuetify.theme.themes.dark.lightGreen as string,
            data
          }
        ]
      };
    },
    userData: function(): UserData[] | undefined {
      if (!this.users) return;
      const userData = this.users.map((user: User) => {
        return {
          username: user.username,
          createdAt: makeCreatedAt(user.timestamp)
        };
      });
      userData.unshift({
        username: "Username",
        createdAt: "Registration Date"
      });
      return userData;
    }
  },
  created (): void {
    (this as any).init();
  },
  methods: {
    async init(): Promise<void> {
      const requests: AxiosRequestConfig[] = [
        {
          url: "/contributions",
          method: "GET"
        },
        {
          url: "/auth/users",
          method: "GET"
        }
      ];

      const [contributions, users] = await callAPI(requests);
      if (this.$store.getters["response/getResponse"].status === 200) {
        this.contributions = contributions;
        this.users = users;
      }
    },
    goUserRegistration(): void {
      this.$router.push("/users/new");
    }
  },
});
</script>
<style scoped>
.container {
  padding: 0 3%;
}
.registration {
  color: white;
}
.contribution-chart {
  max-width: 400px;
  min-width: 250px;
  margin: 0 auto 0 auto;
}
.contribution-card {
  max-height: 100%;
  margin: 10px;
  padding: 10px;
}
.user-table {
  font-size: 18px;
  text-align: center;
  margin: 10px;
}
.detail-left {
  float: left;
  padding: 10px 0;
  padding-left: 30px;
  margin-left: 20px;
}
.detail-left-normal {
  border-left: solid 7px #08b97f;
}
.detail-center {
  color: gray;
  font-size: 1.3vw;
}
.detail-right {
  margin: 0 20px 0 0;
  float: right;
}
.detail-normal {
  color: white;
}
.detail-phone {
  font-size: 14px;
}
</style>
