<template>
  <Transition :duration="{ enter: 500, leave: 500 }">
    <div v-if="props.show" class="search">
      <div class="card">
        <div class="title">
          <span>本地搜索</span>
          <i class="iconfont icon-close" @click="close"></i>
        </div>
        <div class="form">
          <i class="icon iconfont icon-search"></i>
          <input
            v-model="searchContent"
            placeholder="输入文章标题关键字..."
            @input="startSearch"
          />
        </div>
        <hr />
        <div class="result">
          <template v-if="searchList.length">
            <TransitionGroup name="fade" appear>
              <div
                v-for="item in searchList"
                :key="item.id"
                class="item"
                @click="articleDetail(item.id)"
              >
                <div class="info">
                  <div>{{ item.title }}</div>
                  <div>{{ item.description }}</div>
                </div>
                <div class="time">{{ item.createAt.split(' ')[0] }}</div>
              </div>
            </TransitionGroup>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { request } from '@/request'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const searchContent = ref('')
const searchList = ref<any>([])
let timer: any
const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
const close = () => {
  emits('update:show', false)
}
const startSearch = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (!searchContent.value.trim()) {
      searchList.value = []
      return false
    }
    // 通过输入关键字进行模糊查询
    request
      .request({
        url: `/article/query?data=${searchContent.value}`,
        method: 'GET'
      })
      .then(res => {
        if (res.data.errorCode) {
          return ElMessage.warning({ message: res.data.message })
        }
        searchList.value = res.data.list
      })
  }, 1000)
}
const articleDetail = (id: number) => {
  router.push({ name: 'articleDetail', params: { id } })
  emits('update:show', false)
}
</script>

<style scoped lang="less">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: all 1s;
}
.fade-leave-active {
  position: absolute;
}
.v-enter-from .card,
.v-leave-to .card {
  transform: scale(0.5);
  opacity: 0;
}
.v-enter-active .card,
.v-leave-active .card {
  transition: all 0.5s;
}
.search {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: var(--search-z-index);
  .card {
    position: absolute;
    top: 15%;
    bottom: 15%;
    left: 50%;
    transform: translate(-50%);
    width: 500px;
    background: #fff;
    border-radius: 5px;
    padding: 1rem;
    overflow: auto;
    .title {
      font-size: 22px;
      font-weight: bold;
      color: #49b1f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i.icon-close {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          transform: rotate(360deg);
        }
      }
    }
    .form {
      margin: 1rem 0;
      height: 2rem;
      border-radius: 40px;
      border: 2px solid #5f3dc4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        width: 5%;
        text-align: center;
      }
      input {
        flex: 1;
        border: none;
        margin-left: 1rem;
        font-size: 14px;
        i.icon-search {
          font-size: 25px;
        }
        &:focus {
          border: none;
          outline: none;
          outline-offset: none;
        }
      }
    }
    hr {
      border: 2px dashed #49b1f5;
      opacity: 0.6;
    }
    .result {
      .item {
        margin: 1rem 0;
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 10px 1px #ccc;
        }
        .info {
          flex: 0.97;
          div {
            line-height: 2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .time {
          width: 100px;
          font-size: 12px;
          color: #00000080;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 800px) {
  .card {
    width: 300px !important;
  }
}
</style>
