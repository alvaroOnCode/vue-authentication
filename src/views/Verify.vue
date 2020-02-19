<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1 class="title">Congratulations!</h1>
            <h4>The account has been verified.</h4>
            <br />
            <md-button class="md-success md-lg" @click="onGoLogin">Login</md-button>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
export default {
  name: "verify-page",
  bodyClass: "landing-page",
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
      onGoLogin(){
          this.$router.push({ name: "login" });
      }
  }
};
</script>