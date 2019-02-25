<template>
  <div class="code" @click="refreshCode">
    <identify :identifyCode="identifyCode"></identify>
  </div>
</template>

<script>
  import identify from './identify'

  export default {
    components:{
      identify:identify
    },

    name: "codetest",
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: ""
      };
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
      }
    }
  };
</script>

<style>
  .code {
    float: right;
    width: 114px;
    height: 38px;
    border: 1px solid red;
  }
</style>
