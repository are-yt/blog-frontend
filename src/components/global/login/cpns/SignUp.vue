<template>
  <div class="card">
    <div class="head">
      <div class="title">注册</div>
      <i class="iconfont icon-close" @click="cancel"></i>
    </div>
    <div class="item">
      <ElInput
        v-model="registry.email"
        class="inp"
        type="text"
        placeholder="邮箱号"
        clearable
        size="large"
        @keyup.enter="register"
      />
    </div>
    <div class="item">
      <ElInput
        v-model="registry.code"
        class="inp"
        type="text"
        placeholder="验证码"
        clearable
        size="large"
        @keyup.enter="register"
      />
      <span @click="sendCode">{{ text }}</span>
    </div>
    <div class="item">
      <ElInput
        v-model="registry.name"
        class="inp"
        type="text"
        placeholder="你希望展示的昵称"
        clearable
        size="large"
        @keyup.enter="register"
      />
    </div>
    <div class="item">
      <ElInput
        v-model="registry.password"
        class="inp"
        type="text"
        placeholder="密码"
        clearable
        size="large"
        show-password
        @keyup.enter="register"
      />
    </div>
    <div class="item">
      <ElButton type="primary" size="large" class="btn" @click="register">
        注册
      </ElButton>
    </div>
    <div class="footer">
      <span @click="toggle">已有账号？去登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/request'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const registry = reactive({
  email: '',
  code: '',
  name: '',
  password: ''
})
const text = ref<number | string>('发送')
let code = ''
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'toggle', val: 'login'): void
}>()
const cancel = () => {
  emits('cancel')
}
const toggle = () => {
  emits('toggle', 'login')
}
const sendCode = () => {
  if (typeof text.value === 'number') {
    // 倒计时结束才能重新发送
    return
  }
  if (!registry.email.trim()) {
    return ElMessage.warning({ message: '请先输入邮箱账户' })
  }
  // 创建6位随机验证码
  code = ''
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10)
  }
  request
    .request({
      url: `/code/${registry.email}/${code}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data !== '发送成功！') {
        return ElMessage.warning({
          message: res.data + '如未收到，可能在垃圾邮件中'
        })
      }
      // 发送成功
      ElMessage.success({ message: res.data })
      text.value = 60
      let timer = setInterval(() => {
        if (text.value === 0) {
          text.value = '重新发送'
          clearInterval(timer)
        } else {
          ;(text.value as number)--
        }
      }, 1000)
    })
}
const register = () => {
  if (!registry.email.trim()) {
    return ElMessage.warning({ message: '请先输入邮箱' })
  } else if (!registry.code) {
    return ElMessage.warning({ message: '请输入验证码' })
  } else if (!registry.password.trim() || registry.password.trim().length < 7) {
    return ElMessage.warning({ message: '密码长度至少为6位' })
  } else if (!registry.name.trim()) {
    return ElMessage.warning({ message: '需要一个昵称' })
  } else if (registry.code !== code) {
    return ElMessage.warning({ message: '验证码不匹配' })
  }
  // 开始注册
  const { name, email, password } = registry
  request
    .request({
      url: '/user/register',
      method: 'POST',
      data: {
        email,
        name,
        password
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 注册失败
        return ElMessage.error({ message: res.data.message })
      }
      // 注册成功
      ElMessage.success({ message: '注册成功，请去登录' })
      registry.email = ''
      registry.code = ''
      code = ''
      registry.password = ''
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
    margin: 2rem auto;
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
    cursor: pointer;
    span:hover {
      color: #4dabf7;
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
