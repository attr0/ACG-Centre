<template>
  <el-container>
    <el-header><HeadBar></HeadBar></el-header>
    <el-container>
      <SideBar></SideBar>
      <el-main><Main></Main></el-main>
    </el-container>
  </el-container>
</template>

<script>
if (
  navigator.userAgent.includes("iPhone") ||
  navigator.userAgent.includes("iPad")
) {
  let xStart, xEnd, yStart, yEnd;
  document.addEventListener(
    "touchmove",
    (event) => {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    },
    { passive: false }
  );
  document.addEventListener(
    "touchstart",
    (event) => {
      xStart = event.touches[0].pageX;
      yStart = event.touches[0].pageY;
    },
    { passive: false }
  );
  document.addEventListener(
    "touchmove",
    (event) => {
      xEnd = event.touches[0].pageX;
      yEnd = event.touches[0].pageY;
      if (Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd))
        event.preventDefault();
    },
    { passive: false }
  );
  document.addEventListener(
    "plusready",
    function () {
      this.plus.webview.currentWebview().setStyle({
        popGesture: "none",
      });
    },
    { passive: false }
  );
}

history.pushState(null, null, document.URL);
window.addEventListener("popstate", function () {
  history.pushState(null, null, document.URL);
});

import SideBar from "@/components/SideBar.vue";
import HeadBar from "@/components/HeadBar.vue";
import Main from "@/components/Main.vue";
import { init } from "@/components/init.js";

export default {
  name: "App",
  components: {
    SideBar,
    HeadBar,
    Main,
  },
  data() {
    return {};
  },
  setup() {
    return init();
  },
  beforeCreate() {},
  created() {}
};
</script>

<style>
body {
  margin: 0;
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}

html,
body,
#app,
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-main {
  height: 100%;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header {
  --el-header-padding: 0 0px;
  padding: 0;
}

.el-main {
  padding: 0;
}
</style>
