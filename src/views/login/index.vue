<template>
  <div class="login-container">
    <vue-particles
      color="#fff"
      :particle-opacity="0.7"
      :particles-number="60"
      shape-type="circle"
      :particle-size="4"
      lines-color="#fff"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="2"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
      class="lizi"
    />
    <!-- <bg/> -->

    <div class="denglubg">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">对症下药后台管理系统</h3>
          <p class="yingwen">Management System</p>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="off"
            class="condes"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="off"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-form-item prop="codes" style="width:300px; float:left">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input
            v-model="loginForm.codes"
            placeholder="请输入验证码"
            name="codes"
            type="text"
            tabindex="1"
            autocomplete="off"
          />
        </el-form-item>

        <div class="suiji" @click="chongzhi">
          <codes :identify-code="identifyCode" />
        </div>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:17px;"
          @click.native.prevent="handleLogin"
        >立即登录</el-button>

        <div style="position:relative">
          <div class="tips">
            <span>© 2019 对症下药 版权所有</span><br>
            <span>Inc. Licensed under MIT license.</span>
          </div>
          <!-- <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div> -->
          <!--
        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
//  import bg from "./components/Bg";

import codes from './components/Code'

export default {
  name: 'Login',
  components: { SocialSign, codes },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('您输入的用户名不正确'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('您输入的密码不正确'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error('您输入验证码不正确'))
      } else {
        callback()

        console.log('你输入的验证码正确')
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        codes: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        codes: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      identifyCodes:
        '123456789qwertyuopasdfghjkzxcvbnmQWERTYUIPASDFGHJKLZXCVBNM',
      identifyCode: '',
      code: '' // text框输入的验证码
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.refreshCode()
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    chongzhi() {
      this.refreshCode()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.particles-js-canvas-el {
  position: absolute;
}

.suiji {
  width: 150px;
  margin-top: 10px;
  float: right;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #16a085;
$dark_gray: #fff;
$light_gray: #fff;

>>> input:-internal-autofill-selected {
  background-color: rgb(232, 240, 254) !important;
  background-image: none !important;
  color: rgb(255, 255, 255) !important;
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 26px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 10px;
    text-align: center;
    opacity: 0.6;
    height: 50px;
    line-height: 20px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #333;
  }

.el-button--medium{

     width: 100%;
    height: 42px;
    border: 0;
    font-size: 16px;
    background: #048f74;
    color: #f8f8f8;
}

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto -6px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.yingwen {
  font-style: italic;
  text-align: center;
  color: #fff;
}
.denglubg {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;

  width: 520px;
  margin: 120px auto 0 auto;
}
</style>
