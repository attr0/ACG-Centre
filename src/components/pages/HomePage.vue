<template>
  <el-row justify="center" v-loading="loading">
    <el-col :xs="24" :sm="11">
      <h1>動畫廣場</h1>
      <el-empty
        v-if="mediaData.root && mediaData.root.length == 0"
        description="API 裂开了呢, 点击重新加载"
        @click="reloadRottDictory"
      ></el-empty>
      <el-table
        :data="this.mediaData.root"
        stripe
        v-else
        height="60vh"
        @row-click="openDictory"
      >
        <el-table-column
          prop="season"
          label="Season"
          align="center"
        ></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { loadRootDictory } from "@/components/pages/MediaData";
import { inject } from "vue";

export default {
  name: "HomePage",
  props: ["config"],
  data() {
    return {
      loading: true,
    };
  },
  setup() {
    const mediaData = inject("mediaData");
    const Tab = inject("Tab");
    const apiConfig = inject("apiConfig");
    return {
      mediaData,
      Tab,
      apiConfig,
    };
  },
  mounted() {
    loadRootDictory(this.$data, this.mediaData, this.apiConfig);
  },
  methods: {
    reloadRottDictory() {
      loadRootDictory(this.$data, this.mediaData, this.apiConfig);
    },
    openDictory(row) {
      this.Tab.openVideoDictory({
        title: row["season"],
        path: row["path"],
        rootPath: "/",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.6rem;
}
</style>