<template>
  <div class="profile">
    <PageTop
      :title="accountStore.account.name + '的个人信息'"
      bg="http:///p18.qhimg.com/d/_open360/design0217/2.jpg"
      font-size="1.5rem"
    />
    <Transition name="page-content" appear>
      <div class="container">
        <div class="content">
          <div class="nickname">
            <ElInput v-model="name" class="name-input" clearable />
            <ElButton type="primary" @click="updateName">修改</ElButton>
          </div>
          <div class="avatar">
            <img
              v-if="accountStore.account.avatar"
              :src="accountStore.account.avatar"
            />
            <img v-else src="~@/assets/imgs/avatar.svg" />
            <div class="control">
              <label class="choose-avatar-btn" for="avatar">
                <span>选择头像</span>
              </label>
              <input id="avatar" ref="file" type="file" @change="fileChange" />
              <ElButton class="upload" type="success" @click="upload">
                更换
              </ElButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PageTop from '@/components/common/PageTop.vue'
import { useAccount } from '@/store'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { request } from '@/request'
const accountStore = useAccount()
const name = ref('')
const file = ref<any>()
// 更新头像
const upload = () => {
  const files = file.value?.files
  const type = files[0]?.type
  if (files.length > 1) {
    return ElMessage.warning({ message: '选择了多张图片' })
  } else if (files.length === 0) {
    return ElMessage.warning({ message: '还没有选择头像文件捏~' })
  } else if (
    type === 'image/jpeg' ||
    type === 'image/png' ||
    type === 'image/gif'
  ) {
    // 开始上传
    const avatar = files[0]
    const formdata = new FormData()
    formdata.append('avatar', avatar)
    request
      .request({
        url: `/admin/avatar/${accountStore.account.id}`,
        method: 'POST',
        data: formdata,
        interceptors: {
          requestInterceptorsSuc(config) {
            config.headers = {
              'Content-Type': 'multipart/form-data'
            }
            return config
          }
        }
      })
      .then(res => {
        if (res.data.errorCode) {
          return ElMessage.warning({ message: res.data.message })
        }
        // 更新头像成功
        ElMessage.success({ message: '头像更新成功' })
        const local = JSON.parse(
          localStorage.getItem('cyblog-user-info') as string
        )
        local.avatar = res.data.data.url
        accountStore.updateAccountInfo(local)
        localStorage.setItem('cyblog-user-info', JSON.stringify(local))
      })
  } else {
    ElMessage.error({ message: '选择了非image类型文件' })
  }
}
// 更新昵称
const updateName = () => {
  if (name.value.trim().length === 0) {
    return ElMessage.warning({ message: '违规昵称' })
  }
  request
    .request({
      url: `/user/update/name/${accountStore.account.id}/${name.value}`,
      method: 'POST'
    })
    .then(res => {
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      ElMessage.success({ message: '修改昵称成功' })
      const local = JSON.parse(
        localStorage.getItem('cyblog-user-info') as string
      )
      local.name = name.value
      accountStore.updateAccountInfo(local)
      localStorage.setItem('cyblog-user-info', JSON.stringify(local))
      name.value = ''
    })
}
// 选择了新头像
const fileChange = () => {
  ElMessage.success({ message: '选择成功' })
}
</script>

<style scoped lang="less">
.container {
  padding: 1rem 0;
  min-height: var(--container-height);
  background: var(--main-background-color);
  display: flex;
  align-items: center;
  .content {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .nickname {
      width: 60%;
      padding: 1rem;
      border-radius: 10px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name-input {
        width: 80%;
      }
    }
    .avatar {
      flex: 0.9;
      padding: 1rem 0;
      background: #fff;
      border-radius: 10px;
      img {
        display: block;
        width: 115px;
        height: 115px;
        border-radius: 50%;
        margin: 0 auto 1rem auto;
      }
      .control {
        width: 70%;
        margin: 1rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .choose-avatar-btn {
          // margin-left: 1rem;
          span {
            padding: 7px 1rem;
            background: #90d7ec;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
              background: #90d7ec80;
            }
          }
        }
        #avatar {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 900px) {
  .container {
    .content {
      width: 90%;
      .nickname {
        width: 90%;
      }
      .avatar {
        flex: 0 0 230px;
        margin: 1rem 0;
      }
    }
  }
}
</style>
