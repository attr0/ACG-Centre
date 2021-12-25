<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="10">
      <h1>Likes</h1>
      <el-table
        :data="LikesList"
        stripe
        height="60vh"
        @cell-click="clickHandler"
      >
        <el-table-column
          prop="title"
          label="Name (Click to Jump)"
          align="center"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="parentTitle"
          label="Season"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column label="Delete" align="center">
          <el-button plain size="small" :icon="Delete"></el-button>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { inject } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { removeLikes } from "@/components/pages/Likes.js";

export default {
  name: "LikesPage",
  props: ["config"],
  data() {
    return {};
  },
  setup() {
    const Likes = inject("Likes");
    const Tab = inject("Tab");
    return {
      Likes,
      Tab,
      Delete,
    };
  },
  computed: {
    LikesList() {
      if (!this.Likes) return [];
      const tmp = [];
      Object.keys(this.Likes).forEach((key) => {
        tmp.push(this.Likes[key]);
      });
      return tmp;
    },
  },
  methods: {
    openVideo(row) {
      this.Tab.openVideoPage({
        title: row.title,
        path: row.path,
        parentTitle: row.parentTitle,
        parentPath: row.parentPath,
        type: row.type,
      });
    },
    clickHandler(row, column) {
      if (column.label === "Name (Click to Jump)") this.openVideo(row);
      if (column.label === "Delete") this.deleteLike(row);
    },
    handleClose(done) {
      ElMessageBox.confirm("<b>确认删除？</b>", {
        center: true,
        dangerouslyUseHTMLString: true,
      })
        .then(() => done())
        .catch(() => {});
    },
    deleteLike(row) {
      this.handleClose(() => {
        removeLikes(this.Likes, row);
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