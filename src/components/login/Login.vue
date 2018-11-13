<template>
  <div class="login-container">
    <h1>商城后台管理系统</h1>
    <el-form :label-position="labelPosition" :model="loginForm" :rules="rules" ref="login" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },

      labelPosition: "right",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.$http.post("login", this.loginForm).then(res => {
            const { data, meta } = res.data;
            const { status, msg } = meta;

            if (status === 200) {
              // 登录成功，跳转到首页
              // alert('登录成功')
              console.log(data);
              localStorage.setItem("token", data.token);
              this.$router.push("/home");
              this.$message({
                type: "success",
                message: msg
              });
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.login.resetFields();
    }
  }
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: skyblue;
  /* text-align: center; */
}
.login-container h1 {
  text-align: center;
  padding-top: 100px;
  font-size: 50px;
  color: tomato;
}
.login-form {
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  margin: 20px auto;
  background-color: #fff;
}
</style>
