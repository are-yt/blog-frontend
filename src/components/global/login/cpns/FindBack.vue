<template>
  <div class="card">
    <div class="head">
      <div class="title">忘记密码</div>
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
      />
    </div>
    <div class="item">
      <ElInput
        v-model="account.code"
        class="inp"
        type="text"
        placeholder="验证码"
        clearable
        size="large"
      />
      <span @click="sendCode">{{ text }}</span>
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
        @keyup.enter="resetPassword"
      />
    </div>
    <div class="item">
      <ElButton type="primary" size="large" class="btn" @click="resetPassword">
        重置
      </ElButton>
    </div>
    <div class="footer">
      <span @click="toggle">登录</span>
      <span @click="toggle2">注册</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { request } from '@/request'
import { useAccount } from '@/store'
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'toggle', val: 'login' | 'register'): void
}>()
const cancel = () => emits('cancel')
const account = reactive({
  email: '',
  code: '',
  password: ''
})
let code = ''
const text = ref<number | string>('发送')
const sendCode = () => {
  if (!account.email.trim()) {
    return ElMessage.warning({ message: '请先输入邮箱' })
  }
  if (typeof text.value === 'number') {
    return
  }
  // 创建6位随机验证码
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10)
  }
  request
    .request({
      url: `/code/${account.email}/${code}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data === '发送成功！') {
        ElMessage.success({
          message: '验证码已发送，如未收到，可能在垃圾邮件中'
        })
        text.value = 60
        let interval = setInterval(() => {
          if (text.value === 0) {
            text.value = '重新发送'
            clearInterval(interval)
          } else {
            ;(text.value as number)--
          }
        }, 1000)
      }
    })
}
const toggle = () => emits('toggle', 'login')
const toggle2 = () => emits('toggle', 'register')
// 重置密码
const resetPassword = () => {
  if (!account.email.trim()) {
    return ElMessage.warning({ message: '请输入正确的邮箱' })
  } else if (!account.code) {
    return ElMessage.warning({ message: '缺少验证码' })
  } else if (!account.password.trim() || account.password.length < 6) {
    return ElMessage.warning({ message: '密码长度至少为6位' })
  } else if (account.code !== code) {
    return ElMessage.warning({ message: '验证码错误' })
  }
  // 开始重置密码
  request
    .request({
      url: '/user/password/reset',
      method: 'POST',
      data: {
        email: account.email,
        password: account.password
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 重置密码失败
        return ElMessage.warning({ message: '重置密码失败' })
      }
      // 重置密码成功
      useAccount().updateAccountInfo({
        id: 0,
        name: '',
        avatar: '',
        email: '',
        token: ''
      })
      localStorage.removeItem('cyblog-user-info')
      ElMessage.success({ message: '重置密码成功' })
      emits('toggle', 'login')
    })
}
</script>

<style scoped lang="less">
.card {
  position: absolute;
  left: 50%;
  height: 450px;
  width: 500px;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  .head {
    width: 90%;
    margin: 0 auto;
    position: relative;
    height: 50px;
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
    margin: 2.5rem auto;
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
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    span {
      cursor: pointer;
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 680px) {
  .card {
    width: 300px;
  }
}
</style>
