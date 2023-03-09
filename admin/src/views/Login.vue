<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "login",
  components: {},
  data() {
    return {
      model: {
        loginDate: new Date()
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  },
  created() {
    if (localStorage.token) {
      //登陆了自动跳到首页，来阻止重复登陆
      this.$router.push("/");
    }
  }
};
</script>
<style>
.login-container {
  width: 100%;
  height: 100%;
  background-color: rgb(218, 218, 218);
  overflow: hidden;
}
.login-card {
  width: 30rem;
  margin: 6rem auto;
  background-color: #fff;
}
</style>

