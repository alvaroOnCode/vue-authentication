<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <login-card header-color="green" v-if="!isSent">
            <h4 slot="title" class="card-title">Get verification email again</h4>

            <md-field class="md-form-group" slot="inputs">
              <md-icon>email</md-icon>
              <label>Email</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>

            <md-button slot="footer" class="md-simple md-success md-lg" @click="onSend">Send</md-button>
          </login-card>

          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100" v-else>
            <h1 class="title">Check your inbox!</h1>
            <h4>We sent you an email to start the recovering password process.</h4>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  name: "expired",
  bodyClass: "expired",
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
    onSend() {
      const xhttp = new XMLHttpRequest();

      xhttp.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          this.isSent = true;
        }
      };

      xhttp.open("POST", `${process.env.VUE_APP_API}auth/resend`, true);

      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );

      xhttp.send(`email=${email}`);
    }
  },
  mounted() {
    this.isSent = false;
  }
};
</script>