<template>
  <div :class="['navigator', navigatorClass]">
    <teleport to=".fold">
      <Transition name="fold" :duration="{ enter: 500, leave: 500 }">
        <Fold
          v-if="isFold"
          @hide="isFold = false"
          @home="home"
          @login="login"
          @classification="classification"
          @cate="cate"
          @tag="tag"
          @link="link"
          @logout="logout"
          @about="about"
          @leaveword="leaveword"
          @moment="moment"
          @profile="profile"
        />
      </Transition>
    </teleport>
    <teleport to=".search">
      <Search v-model:show="isSearch" />
    </teleport>
    <teleport to=".login">
      <Login v-model:show="isLogin" />
    </teleport>
    <h3 @click="home">cy丶个人博客</h3>
    <div class="list">
      <NavItem
        icon-str="iconfont icon-search"
        name="搜索"
        :font-size="22"
        :hover-color="hoverColor"
        @click="search"
      ></NavItem>
      <NavItem
        icon-str="iconfont icon-home"
        name="首页"
        :hover-color="hoverColor"
        @click="home"
      ></NavItem>
      <NavItem
        icon-str="iconfont icon-faxian"
        name="发现"
        select
        :hover-color="hoverColor"
      >
        <template #select>
          <NavItem
            icon-str="iconfont icon-guidangicon"
            name="归档"
            :hover-color="hoverColor"
            @click="classification"
          ></NavItem>
          <NavItem
            icon-str="iconfont icon-fenlei"
            name="分类"
            :hover-color="hoverColor"
            @click="cate"
          ></NavItem>
          <NavItem
            icon-str="iconfont icon-biaoqian_o"
            name="标签"
            :hover-color="hoverColor"
            @click="tag"
          ></NavItem>
        </template>
      </NavItem>
      <NavItem
        icon-str="iconfont icon-duihuakuang"
        name="说说"
        :hover-color="hoverColor"
        @click="moment"
      ></NavItem>
      <NavItem
        icon-str="iconfont icon-lianjie"
        name="友链"
        :hover-color="hoverColor"
        @click="link"
      ></NavItem>
      <NavItem
        icon-str="iconfont icon-bangzhuguanyuwomen"
        name="关于"
        :hover-color="hoverColor"
        @click="about"
      ></NavItem>
      <NavItem
        icon-str="iconfont icon-liuyan"
        name="留言"
        :hover-color="hoverColor"
        @click="leaveword"
      ></NavItem>
      <NavItem
        v-if="!accountStore.account.id"
        icon-str="iconfont icon-denglu"
        name="登录"
        :hover-color="hoverColor"
        @click="login"
      ></NavItem>
      <NavItem
        v-else
        icon-str="iconfont icon-denglu"
        name="我的"
        select
        :hover-color="hoverColor"
        @click="login"
      >
        <template #select>
          <NavItem
            icon-str="iconfont icon-profile"
            name="信息管理"
            @click.stop="profile"
          ></NavItem>
          <NavItem
            icon-str="iconfont icon-zhuxiao"
            name="注销"
            @click.stop="logout"
          ></NavItem>
        </template>
      </NavItem>
    </div>
    <div class="fold">
      <i class="iconfont icon-search" @click="search"></i>
      <i class="iconfont icon-s-fold" @click="isFold = true"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavItem from './cpns/NavItem.vue'
import Fold from './cpns/Fold.vue'
import Search from '../search/Search.vue'
import Login from '../login/Login.vue'
import { watch, ref, useCssModule } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@/store'
import { ElMessage } from 'element-plus'
const accountStore = useAccount()
const navigatorClass = ref('')
const classes = useCssModule('classes')
const hoverColor = ref('')
const isSearch = ref(false)
const isFold = ref(false)
const isLogin = ref(false)
const router = useRouter()
const props = defineProps<{
  y: number
}>()
watch(
  () => props.y,
  (val: number, oldval: number) => {
    if (oldval - val < 0) {
      // 向下滑动，隐藏navigator
      navigatorClass.value = classes['fade-out']
    } else if (oldval - val > 0 && val) {
      // 向上滑动但没触顶，显示navigator
      navigatorClass.value = classes['fade-in']
      hoverColor.value = '#5c7cfa'
    } else if (oldval - val > 0) {
      // 向上滑动且触顶了
      navigatorClass.value = ''
      hoverColor.value = ''
    }
  }
)
// 首页
const home = () => {
  router.push('/home')
}
// 搜索
const search = () => {
  isSearch.value = true
}
// 登录
const login = () => {
  isLogin.value = true
}
// 归档
const classification = () => router.push('/classification')
// 分类
const cate = () => router.push('/cate')
// 标签
const tag = () => router.push('/tag')
// 友链
const link = () => router.push('/link')
// 注销
const logout = () => {
  accountStore.updateAccountInfo({
    id: 0,
    name: '',
    token: '',
    avatar: '',
    email: ''
  })
  localStorage.removeItem('cyblog-user-info')
  return ElMessage.success({ message: '注销成功' })
}
// 关于
const about = () => router.push('/about')
// 留言
const leaveword = () => router.push('/leaveword')
// 说说
const moment = () => router.push('/moment')
// 个人信息
const profile = () => router.push('/profile')
</script>

<style module="classes">
.fade-out {
  animation: fadeout 0.5s forwards;
}
.fade-in {
  animation: fadein 0.5s forwards;
  background: rgba(255, 255, 255, 0.5);
}
@keyframes fadeout {
  0% {
    opacity: 0.9;
    transform: translateY(0);
  }
  50% {
    background: #fff;
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}
@keyframes fadein {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    color: #000;
  }
}
</style>

<style scoped lang="less">
.fold-enter-from :deep(.fold-content),
.fold-leave-to :deep(.fold-content) {
  transform: translateX(100%);
}
.fold-enter-active :deep(.fold-content),
.fold-leave-active :deep(.fold-content) {
  transition: all 0.5s;
}
.navigator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--navigator-z-index);
  color: #fff;
  padding: 0 2rem;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
  h3 {
    cursor: pointer;
  }
  .list {
    display: flex;
    align-items: center;
  }
  .fold {
    display: none;
    i.iconfont {
      font-size: 25px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 968px) {
  .list {
    display: none !important;
  }
  .fold {
    display: block !important;
  }
  .navigator {
    padding: 3px 1rem;
  }
}
</style>
