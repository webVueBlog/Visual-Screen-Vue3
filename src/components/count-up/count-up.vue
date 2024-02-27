<script lang="ts">
export type { CountUp as ICountUp, CountUpOptions } from 'countup.js'
export default {
  name: 'CountUp'
}
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

const props = withDefaults(
  defineProps<{
    // 结束数值
    endVal: number | string
    // 开始数值
    startVal?: number | string
    // 动画时长，单位 s
    duration?: number | string
    // 是否自动计数
    autoplay?: boolean
    // 循环次数，有限次数 / 无限循环
    loop?: boolean | number | string
    // 延时，单位 s
    delay?: number
    // countup 配置项
    options?: CountUpOptions
  }>(),
  {
    startVal: 0,// 开始数值
    duration: 2.5,// 动画时长，单位 s
    autoplay: true,// 是否自动计数
    loop: false,// 循环次数，有限次数 / 无限循环
    delay: 0,// 延时，单位 s
    options: undefined// {}
  }
)
const emits = defineEmits<{
  // countup init complete
  (event: 'init', countup: CountUp): void//Promise<CountUp>
  // count complete
  (event: 'finished'): void
}>()

let elRef = ref<HTMLElement>()// 挂载的 DOM 元素
let countUp = ref<CountUp>()// 实例

const initCountUp = () => {// 初始化 countup
  if (!elRef.value) return// 挂载的 DOM 元素不存在
  const startVal = Number(props.startVal)// 开始数值
  const endVal = Number(props.endVal)// 结束数值
  const duration = Number(props.duration)/* 动画时长，单位 s */
  countUp.value = new CountUp(elRef.value, endVal, {
    startVal,
    duration,
    ...props.options// countup 配置项
  })
  if (countUp.value.error) {// 初始化失败
    console.error(countUp.value.error)/* 打印错误信息 */
    return
  }
  emits('init', countUp.value)// 初始化完成，触发 init 事件
}

const startAnim = (cb?: () => void) => {// 开始动画
  countUp.value?.start(cb)
}

// endVal change & autoplay: true, restart animate
watch(
  () => props.endVal,// 结束数值
  (value) => {
    if (props.autoplay) {// 自动计数
      countUp.value?.update(value)// 更新数值
    }
  }
)

// loop animation
const finished = ref(false)/* 动画是否完成 */
let loopCount = 0/* 循环次数 */
const loopAnim = () => {// 循环动画
  loopCount++
  startAnim(() => {// 动画完成回调
    const isTruely = typeof props.loop === 'boolean' && props.loop// 循环次数大于最大循环次数
    if (isTruely || props.loop > loopCount) {
      delay(() => {// 延迟一段时间后重新开始动画
        countUp.value?.reset()/* 重置动画 */
        loopAnim()// 递归调用
      }, props.delay)/* 延迟时间 */
    } else {
      finished.value = true/* 动画完成 */
    }
  })
}
watch(finished, (flag) => {// 监听动画是否完成
  if (flag) {// 动画完成
    emits('finished')
  }
})

onMounted(() => {// 挂载后执行
  initCountUp()/* 初始化 countup */
  if (props.autoplay) {// 自动计数
    loopAnim()// 循环动画
  }
})
onUnmounted(() => {// 卸载后执行
  cancelAnimationFrame(dalayRafId)/* 取消延迟执行 */
  countUp.value?.reset()/* 重置动画 */
})

let dalayRafId: number// 延迟执行的 requestAnimationFrame 标识符
// delay to execute callback function
const delay = (cb: () => unknown, seconds = 1) => {// 延迟执行回调函数
  let startTime: number// 开始时间
  function count(timestamp: number) {// 递归调用
    if (!startTime) startTime = timestamp/* 记录开始时间 */
    const diff = timestamp - startTime// 计算时间差
    if (diff < seconds * 1000) {// 如果时间差小于延迟时间
      dalayRafId = requestAnimationFrame(count)/* 递归调用 */
    } else {
      cb()/* 执行回调函数 */
    }
  }
  dalayRafId = requestAnimationFrame(count)/* 开始递归调用 */
}

const restart = () => {
  initCountUp()/* 初始化 countup */
  startAnim()// 开始动画
}

defineExpose({// 暴露
  init: initCountUp,
  restart
})
</script>

<template>
  <div class="countup-wrap">
    <slot name="prefix"></slot>
    <span ref="elRef"> </span>
    <slot name="suffix"></slot>
  </div>
</template>
