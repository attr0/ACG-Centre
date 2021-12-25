<template>
  <el-row justify="center" v-loading="loading">
    <el-col :span="6">
      <h1>{{ config.title }}</h1>
      <span>{{ config.content }}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HelloPage",
  props: ["config"],
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>

<style scoped>
</style>