<template>
  <div class="leaveword">
    <div class="list">
      <template v-for="item in barrageList" :key="item.id">
        <BarrageItem
          :item="item"
          :w="-client_width + 'px'"
          :bg="accountStore.account.id === item.id ? '#90d7ec50' : '#00000050'"
        />
      </template>
    </div>
    <div class="control">
      <input
        v-model="content"
        type="text"
        placeholder="Enter键发送留言..."
        @keyup.enter.exact="send"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useFooter, useAccount } from '@/store'
import { ElMessage } from 'element-plus'
import { request } from '@/request'
import BarrageItem from './cpns/BarrageItem.vue'
interface IBarrageItem {
  id: number
  content: string
  name: string
  avatar: string
  speed: string
  top: string
}
const content = ref('')
const accountStore = useAccount()
// 计算弹幕的游走距离，可以用position: absolute的right|left=-100%的方式，但渲染时性能消耗较大，改用transform: translateX|Y
const client_width =
  document.documentElement.clientWidth || document.body.clientWidth
// 计算弹幕盒子高度
const client_height =
  document.documentElement.clientHeight || document.body.clientHeight
const barrage_line_count = 8
// 8行弹幕，计算每行弹幕的高度
const barrage_height = Math.floor(client_height / barrage_line_count)
const barrageList = ref<IBarrageItem[]>([])
const send = () => {
  if (accountStore.account.id === 0) {
    return ElMessage.warning({ message: '需要先登录~' })
  } else if (!content.value.trim()) {
    return ElMessage.warning({ message: '没有检查到留言内容~' })
  }
  request
    .request({
      url: '/leaveword/send',
      method: 'POST',
      data: {
        user_id: accountStore.account.id,
        content: content.value
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 留言失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 留言成功
      ElMessage.success({ message: '留言成功' })
      barrageList.value.push({
        id: accountStore.account.id,
        content: content.value,
        name: accountStore.account.name,
        top:
          Math.floor(Math.random() * barrage_line_count) * barrage_height +
          'px',
        speed: 10 - Math.floor(Math.random() * 5) + 's',
        avatar: accountStore.account.avatar
      })
      content.value = ''
    })
}
const getList = () => {
  request
    .request({
      url: '/leaveword/list',
      method: 'GET'
    })
    .then(res => {
      // 获取到留言列表后，每两秒渲染几条
      const list = res.data
      let count = 0
      let interval = setInterval(() => {
        if (count !== list.length) {
          barrageList.value.push({
            id: list[count].id,
            name: list[count].name,
            content: list[count].content,
            avatar: list[count].avatar,
            top:
              Math.floor(Math.random() * barrage_line_count) * barrage_height +
              'px',
            speed: 10 - Math.floor(Math.random() * 5) + 's'
          })
          count++
        } else {
          // 全部渲染了
          clearInterval(interval)
        }
      }, Math.floor(Math.random() * 3000) + 500)
    })
}
getList()
const footerStore = useFooter()
footerStore.isShow = false
onBeforeUnmount(() => {
  footerStore.isShow = true
})
</script>

<style scoped lang="less">
.leaveword {
  height: 100vh;
  overflow: hidden;
  background: url('https://img0.baidu.com/it/u=3656528985,1340430298&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500')
    no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  .list {
    position: absolute;
    top: 55px;
    left: 0;
    right: 0;
    height: calc(100vh - 55px);
  }
  .control {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    color: #fff;
    input {
      border: 1px solid #fff;
      height: 30px;
      border-radius: 10px;
      background: transparent;
      color: #fff;
      width: 167px;
      transition: width 0.5s;
      &:focus {
        outline: none;
        width: 217px;
      }
    }
    span {
      padding: 0 1rem;
      height: 30px;
      border: 1px solid #fff;
      border-radius: 10px;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>

<style scoped>
@media (max-width: 400px) {
  .leaveword > .control > span {
    margin-top: 1rem;
  }
}
</style>
