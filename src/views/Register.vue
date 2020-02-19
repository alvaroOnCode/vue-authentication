<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title" v-if="!submitted">Register</h4>
              <h4 slot="title" class="card-title" v-else-if="exists">Welcome back!</h4>
              <h4 slot="title" class="card-title" v-else>Almost done</h4>

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

              <p
                slot="description"
                class="description"
                v-if="submitted && !exists"
              >Check your email inbox to activate your account.</p>

              <p
                slot="description"
                class="description"
                v-else-if="exists"
              >It seems that you are already registered.</p>

              <md-field class="md-form-group" slot="inputs" v-if="!submitted">
                <md-icon>face</md-icon>
                <label>First Name</label>
                <md-input v-model="firstname"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs" v-if="!submitted">
                <md-icon>face</md-icon>
                <label>Last Name</label>
                <md-input v-model="lastname"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs" v-if="!submitted">
                <md-icon>face</md-icon>
                <label>Username</label>
                <md-input v-model="username"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs" v-if="!submitted">
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs" v-if="!submitted">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-if="!submitted"
                @click="onRegister"
              >Get Started</md-button>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-if="exists"
                @click="onGoLogin"
              >Go to login</md-button>
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
  name: "register",
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data: () => ({
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    submitted: false,
    exists: false
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
    onRegister() {
      this.submitted = true;
      return http({
        method: "POST",
        url: `${process.env.VUE_APP_API}auth/register`,
        data: {
          username: this.username,
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          password: this.password
        }
      })
        .then(response => response.data)
        .then(data => {
          console.log("Register:", data);

          localStorage.setItem("token", `JWT ${data.token}`); // Warning! Don't save JWT in localStore

          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 1250);
        })
        .catch(error => {
          if (typeof error.response.data.message !== "undefined") {
            if (error.response.data.message.indexOf("already") !== -1) {
              this.exists = true;
            }
          }
        });
    },
    onGoLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
