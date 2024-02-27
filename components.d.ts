/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
export {}

declare module 'vue' {
  export interface GlobalComponents {
    BorderBox13: typeof import('./src/components/datav/border-box-13/border-box-13.vue')['default']
    CapsuleChart: typeof import('./src/components/datav/capsule-chart/capsule-chart.vue')['default']
    CountUp: typeof import('./src/components/count-up/count-up.vue')['default']
    ElDrawer: typeof import('element-plus/es')['ElDrawer']
    ElRadio: typeof import('element-plus/es')['ElRadio']
    ElRadioGroup: typeof import('element-plus/es')['ElRadioGroup']
    EmptyCom: typeof import('./src/components/empty-com/empty-com.vue')['default']
    ItemWrap: typeof import('./src/components/item-wrap/item-wrap.vue')['default']
    MessageContent: typeof import('./src/components/Plugins/MessageContent/index.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    ScaleScreen: typeof import('./src/components/scale-screen/scale-screen.vue')['default']
    SeamlessScroll: typeof import('./src/components/seamless-scroll/seamless-scroll.vue')['default']
  }
}
