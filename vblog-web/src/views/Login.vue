<template>
  <div id="login" v-title data-title="登录 - For Fun">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
      </video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>ForFun 登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account" @blur="sliderTestIsShow"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="userForm.password" @blur="sliderTestIsShow"></el-input>
        </el-form-item>

        <!--<el-form-item prop="password">-->
          <!--<el-input placeholder="验证码" style="width: 160px"></el-input>-->
          <!--<TestCode></TestCode>-->
        <!--</el-form-item>-->

        <el-form-item size="small" class="me-login-button">
          <Formal v-on:updateIsdis="changeIsdis($event)" v-if="sliderIsShow"></Formal>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" plain v-bind:disabled="isdis" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>

        <div class="me-login-design">
          <p>Designed by
            <strong>
              <router-link to="/" class="me-login-design-color">ForFun</router-link>
            </strong>
          </p>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
  import  TestCode from './codeTest'
  import  Formal from './sliderVerification/index'
  export default {
    components:{
      'TestCode':TestCode,
      'Formal':Formal
    },
    name: 'Login',
    data() {
      return {
        isdis:true,
        sliderIsShow:false,
        userForm: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      sliderTestIsShow(){
        if(this.userForm.account !== '' && this.userForm.password !== ''){
          this.sliderIsShow = true;
        }
      },
      changeIsdis(isdis){
        this.isdis = isdis;
      },
      login(formName) {
        let that = this

        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('login', that.userForm).then(data => {
              if(data.success){
                that.$message({message: data.data, type: 'success', showClose: true});
                that.$router.go(-1)
              } else{
                this.sliderIsShow = false;
                that.$message({message: data.errmsg, type: 'error', showClose: true});
              }
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: absolute;
    left: 0;
    z-index: 0;
    top: 0;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: white;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-design {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
