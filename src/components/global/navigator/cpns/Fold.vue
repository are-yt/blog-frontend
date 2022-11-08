<template>
  <div v-fold-scroll class="fold" @click.self="toggle">
    <div class="fold-content">
      <img
        v-if="adminStore.adminInfo.avatar"
        :src="adminStore.adminInfo.avatar"
      />
      <img
        v-else
        src="https://img0.baidu.com/it/u=2230067592,4086528048&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500"
      />
      <div class="nav">
        <div class="item">
          <div>文章</div>
          <span>{{ adminStore.adminInfo.articleTotal }}</span>
        </div>
        <div class="item">
          <div>分类</div>
          <span>{{ adminStore.adminInfo.cateTotal }}</span>
        </div>
        <div class="item">
          <div>标签</div>
          <span>{{ adminStore.adminInfo.tagsTotal }}</span>
        </div>
      </div>
      <div class="hr"></div>
      <div class="nav-list">
        <div class="item" @click="home">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </div>
        <div class="item" @click="classification">
          <i class="iconfont icon-guidangicon"></i>
          <span>归档</span>
        </div>
        <div class="item" @click="moment">
          <i class="iconfont icon-duihuakuang"></i>
          <span>说说</span>
        </div>
        <div class="item" @click="cate">
          <i class="iconfont icon-fenlei"></i>
          <span>分类</span>
        </div>
        <div class="item" @click="tag">
          <i class="iconfont icon-biaoqian_o"></i>
          <span>标签</span>
        </div>
        <div class="item" @click="link">
          <i class="iconfont icon-lianjie"></i>
          <span>友链</span>
        </div>
        <div class="item" @click="about">
          <i class="iconfont icon-bangzhuguanyuwomen"></i>
          <span>关于</span>
        </div>
        <div class="item" @click="leaveword">
          <i class="iconfont icon-liuyan"></i>
          <span>留言</span>
        </div>
        <div v-if="!accountStore.account.id" class="item" @click="login">
          <i class="iconfont icon-denglu"></i>
          <span>登录</span>
        </div>
        <div v-else class="item" @click="logout">
          <i class="iconfont icon-zhuxiao"></i>
          <span>注销</span>
        </div>
        <div v-if="accountStore.account.id" class="item" @click="profile">
          <i class="iconfont icon-profile"></i>
          <span>信息管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdmin, useAccount } from '@/store'
const adminStore = useAdmin()
const accountStore = useAccount()
const emits = defineEmits<{
  (e: 'hide'): void
  (e: 'home'): void
  (e: 'login'): void
  (e: 'classification'): void
  (e: 'cate'): void
  (e: 'tag'): void
  (e: 'link'): void
  (e: 'logout'): void
  (e: 'about'): void
  (e: 'leaveword'): void
  (e: 'moment'): void
  (e: 'profile'): void
}>()
const vFoldScroll = {
  mounted() {
    document.documentElement.style.overflow = 'hidden'
  },
  unmounted() {
    document.documentElement.style.overflow = 'auto'
  }
}
const toggle = () => {
  emits('hide')
}
// 首页
const home = () => {
  emits('home')
  emits('hide')
}
// 登录
const login = () => {
  emits('login')
  emits('hide')
}
// 归档
const classification = () => {
  emits('classification')
  emits('hide')
}
// 分类
const cate = () => {
  emits('cate')
  emits('hide')
}
// 标签
const tag = () => {
  emits('tag')
  emits('hide')
}
// 友链
const link = () => {
  emits('link')
  emits('hide')
}
// 注销
const logout = () => {
  emits('logout')
  emits('hide')
}
// 关于
const about = () => {
  emits('about')
  emits('hide')
}
// 留言
const leaveword = () => {
  emits('leaveword')
  emits('hide')
}
// 说说
const moment = () => {
  emits('moment')
  emits('hide')
}
// 个人信息
const profile = () => {
  emits('profile')
  emits('hide')
}
</script>

<style scoped lang="less">
.fold {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: var(--fold-z-index);
  .fold-content {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    overflow: hidden;
    width: 350px;
    background: #fff;
    img {
      display: block;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 2rem auto 1rem auto;
    }
    .nav {
      display: flex;
      justify-content: space-around;
      text-align: center;
      line-height: 2;
    }
    .hr {
      height: 1;
      border-bottom: 2px dashed var(--color-blue-main);
      margin-top: 1rem;
    }
    .nav-list {
      margin-top: 1rem;
      .item {
        font-size: 16px;
        padding-left: 15%;
        margin-top: 1.1rem;
        cursor: pointer;
        i {
          font-size: 20px;
        }
        span {
          margin-left: 2rem;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (min-width: 968px) {
  .fold {
    display: none;
  }
}
@media (max-width: 500px) {
  .fold-content {
    width: 75% !important;
  }
}
</style>
