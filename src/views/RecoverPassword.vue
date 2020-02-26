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
              <h4 slot="title" class="card-title">Recovering password</h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click.prevent="onRecoverPassword"
              >Send</md-button>
            </login-card>
          </div>

          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100" v-else>
            <h1 class="title">Check your inbox!</h1>
            <h4>We sent you an email to start the recovering password process.</h4>
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
  name: "recover-password",
  bodyClass: "recover-password",
  components: {
    LoginCard
  },
  data: () => ({
    email: null,
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
    onRecoverPassword() {
      utils
        .request({
          method: "POST",
          url: `${process.env.VUE_APP_API}auth/recover`,
          async: true,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: `email=${this.email}`
        })
        .then(data => {
          this.setIsSent(true);
        })
        .catch(error => {
          console.log("RecoverPassword KO!", error);
          this.setIsSent(false);
        });
    },
    setIsSent(value) {
      this.isSent = value;
    }
  }
};
</script>