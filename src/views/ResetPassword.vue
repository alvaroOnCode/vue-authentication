<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            v-if="!isSent"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Choose your new password</h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Confirm password</label>
                <md-input v-model="confirmPassword" type="password"></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click.prevent="onResetPassword"
              >Send</md-button>
            </login-card>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100" v-else>
            <h1 class="title">Done!</h1>
            <h4>Your password has been changed.</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import { LoginCard } from "@/components";

export default {
  name: "reset-password",
  bodyClass: "reset-password",
  components: {
    LoginCard
  },
  data: () => ({
    password: null,
    confirmPassword: null,
    rpt: null,
    isSent: false
  }),
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    onResetPassword() {
      utils
        .request({
          method: "POST",
          url: `${process.env.VUE_APP_API}auth/reset/${this.rpt}`,
          async: true,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: `password=${this.password}&confirmPassword=${this.confirmPassword}`
        })
        .then(data => {
          this.isSent = true;
        })
        .catch(error => {
          console.log("ResetPassword KO!", error);
          this.isSent = false;
        });
    }
  },
  mounted() {
    this.rpt = this.$route.params.rpt;
  }
};
</script>