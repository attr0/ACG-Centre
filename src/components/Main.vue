<template>
  <el-tabs
    v-model="this.Tab.activeTab"
    type="card"
    closable
    @tab-remove="this.Tab.removePage"
  >
    <el-tab-pane
      v-for="item in this.Tab.Tabs"
      :key="item.id"
      :label="item.title"
      :name="item.id"
    >
      <keep-alive>
        <component :is="item.component" :config="item.config" />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { inject } from "vue";
import { initTab } from "@/components/pages/Tab.js";

export default {
  name: "Main",
  component: {},
  methods: {},
  setup() {
    const Tab = inject("Tab");

    return {
      Tab,
    };
  },
  mounted() {
    initTab(this.Tab);
  },
};
</script>

<style>
/* .el-main {
  overflow: hidden;
} */
</style>

<style scoped>
.el-tab-pane {
  overflow: auto;
}

.el-tabs,
.el-tab-pane {
  height: 100%;
  border: none;
}

.el-tabs--border-card {
  box-shadow: none !important;
  border: none !important;
}
</style>