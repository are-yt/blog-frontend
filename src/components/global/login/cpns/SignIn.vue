<template>
  <div class="card">
    <div class="head">
      <div class="title">登录</div>
      <i class="iconfont icon-close" @click="cancel"></i>
    </div>
    <div class="item">
      <ElInput
        v-model="account.email"
        class="inp"
        type="text"
        placeholder="邮箱号"
        clearable
        size="large"
        @keyup.enter="login"
      />
    </div>
    <div class="item">
      <ElInput
        v-model="account.password"
        class="inp"
        type="password"
        placeholder="密码"
        clearable
        show-password
        size="large"
        @keyup.enter="login"
      />
    </div>
    <div class="item">
      <ElButton type="primary" size="large" class="btn" @click="login">
        登录
      </ElButton>
    </div>
    <div class="footer">
      <div>
        <span @click="toggle">立即注册</span>
        <span @click="toggle2">忘记密码?</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { request } from '@/request'
import { useAccount } from '@/store'
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'toggle', val: 'register' | 'findback'): void
}>()
const cancel = () => {
  emits('cancel')
}
const toggle = () => {
  emits('toggle', 'register')
}
const toggle2 = () => {
  emits('toggle', 'findback')
}
const account = reactive({
  email: '',
  password: ''
})
const login = () => {
  if (!account.email.trim()) {
    return ElMessage.warning({ message: '未输入账号' })
  } else if (!account.password.trim()) {
    return ElMessage.warning({ message: '未输入密码' })
  }
  // 开始登录
  request
    .request({
      url: '/user/login',
      method: 'POST',
      data: {
        email: account.email,
        password: account.password
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 登录失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 登录成功
      const { id, name, email, avatar, token } = res.data
      const obj = {
        id,
        name,
        email,
        avatar,
        token
      }
      console.log(obj)
      // 保存到本地
      localStorage.setItem('cyblog-user-info', JSON.stringify(obj))
      // 保存到store
      useAccount().updateAccountInfo(obj)
      ElMessage.success({ message: '登录成功' })
      emits('cancel')
    })
}
</script>

<style scoped lang="less">
.card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 450px;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  .head {
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    i.icon-close {
      font-size: 25px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  .item {
    width: 90%;
    margin: 4rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .inp {
      height: 30px;
    }
    span {
      width: 100px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #228be6;
      }
    }
    .btn {
      display: block;
      width: 100%;
      box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
    }
  }
  .footer {
    width: 90%;
    margin: 2rem auto 0 auto;
    div:nth-child(1) {
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    div:nth-child(2) {
      width: 55%;
      margin: 2rem auto;
      display: flex;
      align-items: center;
      font-size: 12px;
      div {
        flex: 1;
        height: 1px;
        border-bottom: 1px solid #868e96;
        margin: 0 10px;
        color: #868e96;
      }
      div:nth-child(2) {
        border: none;
        white-space: nowrap;
      }
    }
    img {
      display: block;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 680px) {
  .card {
    width: 300px;
    transform: translate(-50%, -50%);
  }
  .footer {
    div:nth-child(1) {
      font-size: 14px !important;
    }
  }
}
</style>
