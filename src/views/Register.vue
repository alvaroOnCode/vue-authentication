<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title" v-if="!submitted && !fail">Register</h4>
              <h4 slot="title" class="card-title" v-else-if="exists">Welcome back!</h4>
              <h4 slot="title" class="card-title" v-else-if="fail">Ooops!</h4>
              <h4 slot="title" class="card-title" v-else>Almost done</h4>

              <p
                slot="description"
                class="description"
                v-if="submitted && !exists && !fail"
              >Check your email inbox to activate your account.</p>

              <p
                slot="description"
                class="description"
                v-else-if="exists && !fail"
              >It seems that you are already registered.</p>

              <p
                slot="description"
                class="description"
                v-else-if="fail"
              >Something went wrong. Please, try again.</p>

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
                v-if="exists && !fail"
                @click="onGoLogin"
              >Go to login</md-button>

              <p slot="toolbar" style="text-align: center;" v-if="!submitted && !exists && !fail">
                <router-link :to="{ name: 'login' }">Login</router-link>
              </p>
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
  name: "register-page",
  components: {
    LoginCard
  },
  bodyClass: "register-page",
  data: () => ({
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    submitted: false,
    exists: false,
    fail: false
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
    request(obj) {
      if (!obj.method || !obj.url) {
        return;
      }

      if (!obj.async) {
        obj.async = false;
      }

      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method, obj.url, obj.async);

        if (obj.headers) {
          Object.keys(obj.headers).forEach(key => {
            xhr.setRequestHeader(key, obj.headers[key]);
          });
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
      });
    },
    onRegister() {
      this.submitted = true;
      this.fail = false;

      this.request({
        method: "POST",
        url: `${process.env.VUE_APP_API}auth/register`,
        async: true,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: `username=${this.username}&firstName=${this.firstname}&lastName=${this.lastname}&email=${this.email}&password=${this.password}`
      })
        .then(data => {
          console.log("Register success!", data);
        })
        .catch(error => {
          this.submitted = false;
          console.error(error);

          try {
            if (error.response.status === 401) {
              this.exists = true;
            } else if (error.response.status === 500) {
              this.fail = true;
            }
          } catch (err) {
            this.fail = true;
            console.error(err);
          }
        });
    },
    onGoLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
