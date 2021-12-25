<template>
  <el-row justify="center" v-loading="loading">
    <el-col :xs="24" :sm="11">
      <h1>{{ config.title }}</h1>
      <el-empty
        v-if="mediaData[targetPath] && mediaData[targetPath].length == 0"
        description="API 裂开了呢, 点击重新加载"
        @click="reloadDictory"
      ></el-empty>
      <el-table
        :data="
          this.mediaData[targetPath] &&
          this.mediaData[targetPath].filter(
            (item) =>
              !search || item.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-else
        stripe
        height="60vh"
        @row-click="openVdieo"
      >
        <div id="player" />
        <el-table-column prop="name" label="Name" align="center" sortable>
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { inject } from "vue";
import { loadDictory } from "@/components/pages/MediaData";

export default {
  name: "VideoDictory",
  props: ["config"],
  components: {},
  setup() {
    const mediaData = inject("mediaData");
    const apiConfig = inject("apiConfig");
    const Tab = inject("Tab");

    return {
      mediaData,
      apiConfig,
      Tab,
    };
  },
  data() {
    return {
      loading: true,
      search: "",
      targetPath: this.config.rootPath + this.config.path,
    };
  },
  mounted() {
    loadDictory(this.$data, this.mediaData, this.apiConfig);
  },
  computed: {},
  methods: {
    reloadDictory() {
      loadDictory(this.$data, this.mediaData, this.apiConfig);
    },
    openVdieo(row) {
      this.Tab.openVideoPage({
        title: row.name,
        path: row.path,
        parentTitle: this.config.title,
        parentPath: row.parentPath,
        type: row.type,
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

