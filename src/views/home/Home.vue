<template>
  <div class="home">
    <Transition name="home" appear>
      <div class="introduction">
        <vue-particles color="#409EFF"></vue-particles>
        <div class="shici">
          <span class="content"
            >{{ shiciList }}
            <span v-if="shiciLength !== shiciList.length" class="mouse"></span
          ></span>
        </div>
        <i class="page-down iconfont icon-select" @click="pagedown"></i>
      </div>
    </Transition>
    <Main />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@/request'
import Main from './cpns/Main.vue'
const shiciList = ref('')
const shiciLength = ref(0)
// 请求诗词
request
  .request({
    url: '/shici',
    method: 'GET'
  })
  .then(res => {
    if (res.status === 200) {
      const data = res.data
      shiciLength.value = data.length
      let index = 0
      let timer = setInterval(() => {
        if (index === shiciLength.value - 1) {
          clearInterval(timer)
        }
        shiciList.value += data[index++]
      }, 500)
    }
  })
// 页面下滑
const pagedown = () => {
  const clientHeight = document.documentElement.clientHeight
  const speed = clientHeight / 20
  let timer = setInterval(() => {
    if (document.documentElement.scrollTop + speed > clientHeight) {
      document.documentElement.scrollTop = clientHeight
      clearInterval(timer)
    } else {
      document.documentElement.scrollTop += speed
    }
  }, 10)
}
</script>

<style scoped lang="less">
.home-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.home-enter-active {
  transition: all 1s;
}
.introduction {
  height: 100vh;
  overflow: hidden;
  background: url('~@/assets/imgs/1.jpg') no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  .shici {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-around;
    color: #fff;
    font-size: 2rem;
    width: 90%;
    .mouse {
      height: 2rem;
      border-right: 2px solid #fff;
      animation: mouse 0.5s infinite;
      @keyframes mouse {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
  .page-down {
    font-size: 24px;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    animation: pagedown 1.5s infinite;
    cursor: pointer;
    @keyframes pagedown {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(20px);
        opacity: 0.5;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>

<style lang="less" scoped>
@media (max-width: 600px) {
  .shici {
    font-size: 1.2rem !important;
    .mouse {
      height: 1.2rem !important;
    }
  }
}
</style>
