<script setup lang="ts">
import { RouterView } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";// 引入组件 storeToRefs 作用是将 store 中的响应式状态转换为普通的非响应式数据，以便在模板中使用
import MessageContent from "@/components/Plugins/MessageContent";

const settingStore = useSettingStore();// 设置 store
const { isScale } = storeToRefs(settingStore);// 是否开启缩放 settingStore 作用是获取设置相关的数据和方法
const wrapperStyle = {};// 容器样式
</script>

<template>
  <scale-screen
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
    <div class="content_wrap">
<!--      <Headers />-->
      <RouterView />
<!--      <MessageContent />-->
    </div>
  </scale-screen>
<!--  <Setting />-->
</template>
<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url("@/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;// 背景图片居中显示
}
</style>
