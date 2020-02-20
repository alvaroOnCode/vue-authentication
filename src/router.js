import Vue from "vue";
import Router from "vue-router";

import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import NotFound from "./views/NotFound.vue";
import Profile from "./views/Profile.vue";
import Register from "./views/Register.vue";
import Verify from "./views/Verify.vue";

import hooks from "./hooks";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/not-found",
      name: "not-found",
      components: { default: NotFound, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "expired",
          components: { default: NotFound, header: MainNavbar, footer: MainFooter },
          meta: {
            expired: true
          }
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      components: { default: Register, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/verify",
      name: "verify",
      components: { default: Verify, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      },
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "verified",
          components: { default: Verify, header: MainNavbar, footer: MainFooter },
          meta: {
            verified: true
          }
        }
      ]
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

hooks(router);

export default router;