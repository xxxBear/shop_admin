<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <el-row :gutter="20" id="header-content">
        <el-col :span="4" class="logo">
          <img src="@/assets/logo.png" alt="">
        </el-col>
        <el-col :span="16" class="title">
          电商后台管理系统
        </el-col>
        <el-col :span="4">
          <span>欢迎{{ username }}登陆</span>
          <a class="logout" @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="home-content">
      <el-aside width="200px" class="home-aside">
        <el-menu
          class="menu"
          :unique-opened="true"
          :default-active="activeMenu"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu :index="level1.path" v-for="level1 in menuList" :key="level1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ level1.authName }}</span>
            </template>
            <el-menu-item :index="level2.path" v-for="level2 in level1.children" :key="level2.id">
              <i class="el-icon-menu"></i>
              <span>{{ level2.authName }}</span>
            </el-menu-item>
          </el-submenu>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      menuList: [],
      activeMenu: "home"
    };
  },
  created() {
    this.fetchMenuList();

    this.setActiveMenu();
  },
  methods: {
    async fetchMenuList() {
      const ret = await this.$http.get(`/menus`);

      const { meta, data } = ret.data;
      if (meta.status === 200) {
        this.menuList = data;
      }
    },
    logout() {
      this.$confirm("您确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/login");

          this.$message({
            type: "success",
            message: "退出成功",
            duration: 1000
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 1000
          });
        });
    },
    setActiveMenu() {
      this.activeMenu = this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.home-container,
.home-content,
.home-aside,
.home-main,
.home-aside .menu {
  height: 100%;
}

.home-header {
  line-height: 60px;
  background-color: #b3c1cd;
  font-weight: bolder;
}

.home-header .logo {
  min-width: 180px;
}

.home-header img {
  width: 200px;
  height: 60px;
  overflow: hidden;
  /* vertical-align: middle; */
  margin-left: -20px;
}

.home-header .title {
  text-align: center;
  color: #fff;
  font-size: 30px;
}

.home-header .logout {
  color: #b07a17;
}

.home-aside {
  background-color: #d4dfe4;
}

.home-content {
  background-color: #eaeef1;
}

#header-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
