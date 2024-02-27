<script setup lang="ts">
import { useSettingStore } from "@/stores";// 引入 useSettingStore
import { ref } from "vue";// 引入 ref
import { storeToRefs } from "pinia"// storeToRefs 是一个函数，用于将 Pinia store 中的所有响应式属性转换为 ref 对象。
const isScaleRadio = ref(false);// 是否等比缩放
const leftBottomRadio = ref(true)
const rightBottomRadio = ref(true)
const settingStore = useSettingStore();// 创建一个 useSettingStore 实例
const { indexConfig } = storeToRefs(settingStore)// 解构出 indexConfig 属性

const init = () => {// 初始化设置
  settingStore.initSetting();// 初始化设置
  isScaleRadio.value = settingStore.isScale;// 是否等比缩放
  leftBottomRadio.value = indexConfig.value.leftBottomSwiper// 左下角是否显示轮播图
  rightBottomRadio.value = indexConfig.value.rightBottomSwiper
};
init();
const handleClose = () => {};

const cancelClick = () => {
  settingStore.setSettingShow(false);// 设置弹窗显示状态为 false
};

const confirmClick = () => {};
const isScaleChange = (flag: boolean) => {// 是否等比缩放
  settingStore.setIsScale(flag);
};
const radioChange = (blag: boolean) => {
  settingStore.setIsScale(blag);// 是否等比缩放
  // this.$store.commit('setting/updateSwiper', { val, type })
};
const indexRadioChange = (flag: boolean) => {// 是否等比缩放
  settingStore.setIndexConfig({
    leftBottomSwiper: leftBottomRadio.value,//左轮播
    rightBottomSwiper:rightBottomRadio.value,//右下轮播
  });
}
</script>

<template>
  <el-drawer v-model="settingStore.settingShow" direction="rtl" size="360px">
    <template #header>
      <h2 class="setting-title">设置</h2>
    </template>
    <template #default>
      <div class="left_shu">全局设置</div>
      <div class="setting_item">
        <span class="setting_label">
          是否进行自动适配<span class="setting_label_tip"
            >(默认分辨率1920*1080)</span
          >:
        </span>
        <div class="setting_content">
          <el-radio-group v-model="isScaleRadio" @change="(flag)=>isScaleChange(flag as boolean)">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="left_shu">实时监测</div>
      <div class="setting_item">
        <span class="setting_label">
          设备提醒自动轮询: <span class="setting_label_tip"></span>
        </span>
        <div class="setting_content">
          <el-radio-group
            v-model="leftBottomRadio"
            @change="(flag)=>indexRadioChange(flag as boolean)"
          >
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="setting_item">
        <span class="setting_label"> 实时预警轮播: </span>
        <div class="setting_content">
          <el-radio-group
            v-model="rightBottomRadio"
            @change="(flag)=>indexRadioChange(flag as boolean)"
          >
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
    </template>
     <template #footer></template>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-title {
  font-size: 20px;
  color: #000;
  font-weight: 900;
  text-align: center;
  line-height: 1;
}
.left_shu {
  color: #000;
  font-weight: 900;
  position: relative;
  text-indent: 10px;
  padding: 16px 0 10px 0;
  line-height: 1;
  &::before {
    display: block;
    content: " ";
    height: 16px;
    width: 4px;
    border-radius: 2px;
    background: #0072ff;
    position: absolute;
    left: 0;
  }
}
.setting_item {
  font-size: 14px;
  line-height: 1.5;

  // display: flex;
  .setting_label {
    color: #555454;
  }
  .setting_label_tip {
    font-size: 12px;
    color: #838282;
  }
}
</style>
