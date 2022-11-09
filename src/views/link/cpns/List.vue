<template>
  <div class="list">
    <div class="title">
      <img src="~@/assets/imgs/link.svg" />
      <span>大佬链接</span>
    </div>
    <div class="wrapper">
      <div
        v-for="item in list"
        :key="item.id"
        class="item"
        @click="openLink(item.url)"
      >
        <div class="layer"></div>
        <img :src="item.logo" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@/request'
const list = ref<any>([])
request
  .request({
    url: '/links/list',
    method: 'GET'
  })
  .then(res => {
    list.value = res.data
  })
const openLink = (url: string) => {
  window.open(url)
}
</script>

<style scoped lang="less">
.list {
  .title {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 18px;
      font-weight: bold;
      margin-left: 0.5rem;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 33%;
      height: 90px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      cursor: pointer;
      position: relative;
      margin: 1rem 0;
      &:hover img {
        transform: rotate(360deg);
      }
      &:hover .layer {
        width: 100%;
        height: inherit;
      }
      &:hover {
        box-shadow: inset 0 0 4px 4px #90d7ec;
      }
      &:hover .info {
        color: #fff;
      }
      .layer {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #90d7ec;
        width: 0;
        height: 0;
        border-radius: 10px;
        transition: all 0.5s;
        z-index: 0;
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 50px;
        transition: all 0.5s;
      }
      .info {
        flex: 0.7;
        text-align: center;
        position: relative;
        z-index: 1;
        .name {
          font-weight: bold;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 1rem;
          font-size: 14px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 1260px) {
  .list {
    .wrapper {
      .item {
        width: 48%;
      }
    }
  }
}
@media (max-width: 960px) {
  .list {
    .wrapper {
      justify-content: space-around;
      .item {
        width: 90%;
      }
    }
  }
}
</style>
