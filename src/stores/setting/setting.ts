import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
// import { storeToRefs } from 'pinia';
export const useSettingStore = defineStore('setting', () => {
  const settingShow = ref(false);//设置弹窗显隐
  const isScale = ref(true);//是否进行全局适配
  const indexConfig = ref({
    leftBottomSwiper: true,//左轮播
    rightBottomSwiper: true,//右下轮播
  })
  const defaultOption = ref({
    step: 4, // 数值越大速度滚动越快
    hover: true, // 是否开启鼠标悬停stop
    wheel: false,//在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启
    openWatch: true, // 开启数据实时监控刷新dom
    direction: 1, // 0向下 1向上 2向左 3向右
    limitScrollNum: 4, // 开始无缝滚动的数据量 this.dataList.length
    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
    singleWaitTime: 3000 // 单步运动停止的时间(默认值1000ms)
  })
  const setSettingShow = (flag: boolean) => {//设置弹窗显隐
    settingShow.value = flag
  }
  const setIsScale = (flag: boolean) => {//是否进行全局适配
    isScale.value = flag
    setSettingData()
  }
  const setIndexConfig = (Config: any) => {//设置首页配置
    indexConfig.value = Config
    localStorage.setItem('loftv-indexConfig', JSON.stringify(indexConfig.value))//本地存储
  }
  const initSetting = () => {//初始化设置
    let settingData: any = localStorage.getItem('loftv-settingData')//设置数据
    if (settingData) {
      settingData = JSON.parse(settingData)
      setIsScale(settingData.isScale)//是否进行全局适配
    }
    let settingIndexConfig: any = localStorage.getItem('loftv-indexConfig')//首页配置
    if (settingIndexConfig) {
      settingIndexConfig = JSON.parse(settingIndexConfig)
      setIndexConfig(settingIndexConfig)//设置首页配置
    }
  }
  const setSettingData = () => {//设置设置数据
    localStorage.setItem('loftv-settingData', JSON.stringify({
      isScale: isScale.value
    }))
  }
  return {
    settingShow,
    setSettingShow,
    isScale,
    setIsScale,
    initSetting,
    setSettingData,
    defaultOption,
    indexConfig,
    setIndexConfig
  }
})
