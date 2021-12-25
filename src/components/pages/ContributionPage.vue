<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="10">
      <h1>About</h1>
      <br />
      <h2>简介</h2>
      这是一个基于ANi-Open实现的ACG网站。网站核心纯前端实现，边爬边用，所有数据仅留本地，0隐私风险。欢迎提交问题。
      <el-divider />
      <br />
      <h2>QwQ Acc</h2>
      <ul>
        <li><p>网站施工 及 国内API代理</p></li>
        <li><p>要求不多<b>打钱就行</b>，详情请咨询上游</p></li>
      </ul>
      <el-divider>
        <el-icon><StarFilled /></el-icon>
      </el-divider>
      <br />
      <h2>ANi</h2>
      <ul>
        <li><p>视频API ( 版权问题请找他x )</p></li>
        <li>
          <p>
            <a href="https://t.me/channel_ani" target="_blank">TG Channel</a>,
            <a href="https://ko-fi.com/anidonate" target="_blank">快速捐钱</a>
          </p>
        </li>
      </ul>
      <el-divider>
        <el-icon><StarFilled /></el-icon>
      </el-divider>
      <br />
      <h2>Library & Host Service</h2>
      <ul>
        <li>
          <p><a href="https://v3.cn.vuejs.org" target="_blank">Vue</a></p>
        </li>
        <li>
          <p>
            <a href="https://element-plus.org/zh-CN/" target="_blank"
              >Element3-plus</a
            >
          </p>
        </li>
        <li>
          <p>
            <a href="https://dplayer.js.org/" target="_blank"
              >Dplayer</a
            >
          </p>
        </li>
        <li>
          <p>
            <a href="https://pages.cloudflare.com/" target="_blank"
              >Cloudflare Pages & Workers</a
            >
          </p>
        </li>
      </ul>
      <el-divider />
    </el-col>
  </el-row>
</template>

<script>
import { StarFilled } from "@element-plus/icons-vue";

export default {
  name: "ContributionPage",
  props: ["config"],
  components: {
    StarFilled,
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 5rem;
}

a {
  color: #06285c !important;
}

h1 {
  font-size: 2.6rem;
}

h2 {
  text-align: left;
  font-size: 1.7rem;
}

p {
  font-size: 0.9rem;
  text-align: left;
}
</style>>