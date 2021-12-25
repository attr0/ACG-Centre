<template>
  <el-menu
    id="side-bar"
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isSideBarCollapse"
  >
    <el-menu-item index="1" @click="Home">
      <el-icon><Icon-menu /></el-icon>
      <template #title>Home</template>
    </el-menu-item>
    <el-menu-item index="2" @click="Likes">
      <el-icon><Star /></el-icon>
      <template #title>Likes</template>
    </el-menu-item>
    <el-menu-item index="3" @click="History">
      <el-icon><Management /></el-icon>
      <template #title>History</template>
    </el-menu-item>
    <el-menu-item index="4" @click="Setting">
      <el-icon><Setting /></el-icon>
      <template #title>Settings</template>
    </el-menu-item>
    <el-menu-item index="5" @click="Contribution">
      <el-icon><CoffeeCup /></el-icon>
      <template #title>About</template>
    </el-menu-item>
  </el-menu>
</template>
<script>
import {
  Management,
  Menu as IconMenu,
  Setting,
  Star,
  CoffeeCup,
} from "@element-plus/icons-vue";
import { inject } from "vue";

export default {
  name: "SideBar",
  components: {
    Setting,
    Star,
    IconMenu,
    Management,
    CoffeeCup,
  },
  setup() {
    const isSideBarCollapse = inject("isSideBarCollapse");
    const Tab = inject("Tab");
    return {
      isSideBarCollapse,
      Tab,
    };
  },
  methods: {
    Home() {
      this.Tab.addHomePage();
    },
    Hello() {
      this.Tab.addHelloPage();
    },
    Contribution() {
      this.Tab.addContributionPage();
    },
    Likes() {
      this.Tab.addLikesPage();
    },
    History() {
      this.Tab.addHistoryPage();
    },
    Setting() {
      this.Tab.addSettingPage();
    }
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 10.5rem;
}

.el-menu--collapse {
  min-width: 3.5rem;
  width: 3.5rem;
}

.el-menu-item {
  border: none !important;
}
</style>
