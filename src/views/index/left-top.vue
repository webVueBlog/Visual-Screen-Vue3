<script setup lang="ts">
import { reactive, ref } from "vue";// 引入ref响应式引用
import { currentGET } from "@/api";// 引入GET请求
import CountUp from "@/components/count-up";// 引入CountUp组件
const duration = ref(2);// 动画持续时间，单位为秒
const state = reactive({// 响应式数据
  alarmNum: 759,// 报警数量
  offlineNum: 44,// 离线数量
  onlineNum: 654,// 在线数量
  totalNum: 698,// 总数量
});

const getData = () => {
  currentGET("leftTop").then((res) => {
    console.log(res);
    if (res.success) {
      state.alarmNum = res.data.alarmNum;// 更新报警数量
      state.offlineNum = res.data.offlineNum;// 更新离线数量
      state.onlineNum = res.data.onlineNum;// 更新在线数量
      state.totalNum = res.data.totalNum;// 更新总数量
    }
  });
};
getData();
</script>

<template>
  <ul class="user_Overview flex">
    <li class="user_Overview-item" style="color: #00fdfa">
      <div class="user_Overview_nums allnum">
        <CountUp :endVal="state.totalNum" :duration="duration" />
      </div>
      <p>总设备数</p>
    </li>
    <li class="user_Overview-item" style="color: #07f7a8">
      <div class="user_Overview_nums online">
        <CountUp :endVal="state.onlineNum" :duration="duration" />
      </div>
      <p>在线数</p>
    </li>
    <li class="user_Overview-item" style="color: #e3b337">
      <div class="user_Overview_nums offline">
        <CountUp :endVal="state.offlineNum" :duration="duration" />
      </div>
      <p>掉线数</p>
    </li>
    <li class="user_Overview-item" style="color: #f5023d">
      <div class="user_Overview_nums laramnum">
        <CountUp :endVal="state.alarmNum" :duration="duration" />
      </div>
      <p>告警次数</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.left-top {
  width: 100%;
  height: 100%;
}

.user_Overview {
  li {
    flex: 1;

    p {
      text-align: center;
      height: 16px;
      font-size: 16px;
    }

    .user_Overview_nums {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      margin: 50px auto 30px;
      background-size: cover;
      background-position: center center;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &.bgdonghua::before {
        animation: rotating 14s linear infinite;
      }
    }

    .allnum {
      &::before {
        background-image: url("@/assets/img/left_top_lan.png");
      }
    }

    .online {
      &::before {
        background-image: url("@/assets/img/left_top_lv.png");
      }
    }

    .offline {
      &::before {
        background-image: url("@/assets/img/left_top_huang.png");
      }
    }

    .laramnum {
      &::before {
        background-image: url("@/assets/img/left_top_hong.png");
      }
    }
  }
}
</style>
