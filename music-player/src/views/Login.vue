<template>
  <div class="login">
    <div class="logo">
      <!-- <img src="../../dist/img/wyy.logo.jpg" alt="" /> -->
    </div>
    <div class="box">
      <input
        type="text"
        class="username"
        v-model="username"
        placeholder="用户名/手机号/邮箱"
      />
      <input
        type="password"
        class="password"
        v-model="password"
        placeholder="请输入登录密码"
      />
    </div>
    <div class="btn">
      <div @click="register">登录</div>
      <div>注册</div>
    </div>
    <div class="third-party">
      <p>其他登录方式</p>
      <ul class="icon">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      username: "admin",
      password: "666666",
    };
  },
  methods: {
    register() {
      if (this.username === "admin" && this.password === "666666") {
        //   本地存储token
        localStorage.setItem("token", "Bearer xxx");
        console.log(22);
        this.$router.push({ path: "/home" });
      } else {
        localStorage.removeItem("token");
        alert("请输入正确的用户名与密码");
        this.username = "";
        this.password = "";
      }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.login {
  .logo {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding-top: 30px;
    // background: url('../../dist/img/home_bg_2x.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;
    img {
      width: 180px;
      height: 180px;
    }
  }
  .box {
    height: 200px;
    text-align: center;
    input {
      width: 75%;
      height: 35px;
      line-height: 35px;
      margin-top: 20px;
      border-radius: 20px;
      border: solid #ff3a3a 2px;
      outline: none;
      padding-left: 15px;
      color: #ccc;
      font-size: 20px;
      &:focus {
        color: black;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    div {
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 25px;
      border-radius: 20px;
      margin-right: 20px;
      &:nth-child(1) {
        background: #ff3a3a;
        color: #fff;
      }
      &:nth-child(2) {
        border: solid #ff3a3a 1px;
      }
    }
  }
  .third-party {
    height: 70px;
    margin-top: 60px;
    text-align: center;
    p {
      color: #ccc;
    }
  }
}
</style>