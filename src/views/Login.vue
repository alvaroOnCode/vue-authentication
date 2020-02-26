<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title" v-if="notFound || doNotMatch">Ooops!</h4>
              <h4 slot="title" class="card-title" v-else>Login</h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="onLogin"
                v-if="notFound || doNotMatch"
              >Try again!</md-button>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="onLogin"
                v-else
              >Go!</md-button>

              <p slot="toolbar" style="text-align: center;">
                <router-link :to="{ name: 'recover-password' }">Forgot password?</router-link>·
                <router-link :to="{ name: 'register' }">Create account</router-link>
              </p>
            </login-card>
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
  name: "login-page",
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data: () => ({
    firstname: null,
    email: null,
    password: null,
    notFound: false,
    doNotMatch: false
  }),
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg.jpg")
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
    onLogin() {
      utils
        .request({
          method: "POST",
          url: `${process.env.VUE_APP_API}auth/login`,
          async: true,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: `email=${this.email}&password=${this.password}`
        })
        .then(data => {
          localStorage.setItem("token", `JWT ${data.token}`);

          setTimeout(() => {
            this.$router.push({ name: "profile" });
          }, 2500);
        })
        .catch(error => {
          console.log("Login KO!", error);
          this.isSent = false;
        });
    }
  }
};
</script>

<style lang="css"></style>
