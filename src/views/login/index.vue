<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">成学谷会员管理系统</h2>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // 提交表单给后台进行验证是否正确
          this.$store
            .dispatch("Login", this.form)
            .then((response) => {
              console.log("response.flag", response.flag);
              // response 就是响应回来的那个真实对象
              if (response.flag) {
                // 前往首页
                this.$router.push("/");
              } else {
                this.$message({
                  message: response.message,
                  type: "waring",
                });
              }
            })
            .catch((error) => {});
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* center */
  margin: 160px auto;

  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
