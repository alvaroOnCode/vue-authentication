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

              <!--<md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>

              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>

              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>

              <p slot="description" class="description">Or Be Classical</p>-->

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
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "axios";
import { LoginCard } from "@/components";

export default {
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
      return http({
        method: "POST",
        url: `${process.env.VUE_APP_API}auth/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => response.data)
        .then(data => {
          console.log("Login:", data);

          setTimeout(() => {
            this.$router.push({ name: "profile" });
          }, 1250);
        })
        .catch(error => {
          if (error.response.data.message.indexOf("already") !== -1) {
            this.exists = true;
          }
        });
    }
  }
};
</script>

<style lang="css"></style>
