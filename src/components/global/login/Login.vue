<template>
  <Transition name="login">
    <div v-if="props.show" class="wrapper">
      <div v-if="type === 'login'">
        <SignIn v-if="type === 'login'" @cancel="cancel" @toggle="toggle" />
      </div>
      <div v-else-if="type === 'register'">
        <SignUp @cancel="cancel" @toggle="toggle" />
      </div>
      <div v-else>
        <FindBack @cancel="cancel" @toggle="toggle" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SignIn from './cpns/SignIn.vue'
import SignUp from './cpns/SignUp.vue'
import FindBack from './cpns/FindBack.vue'
const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits(['update:show'])
const cancel = () => {
  emits('update:show', false)
}
const type = ref('login')
const toggle = (val: string) => {
  type.value = val
}
</script>

<style scoped lang="less">
.login-enter-from,
.login-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.login-enter-active,
.login-leave-active {
  transition: all 0.5s;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--login-z-index);
  background: rgba(0, 0, 0, 0.2);
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
