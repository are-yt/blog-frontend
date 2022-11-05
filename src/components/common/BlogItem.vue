<template>
  <div class="blog-item">
    <div
      v-if="index % 2"
      class="bg left-bg"
      :style="{
        background: `url(${props.item.surface}) no-repeat`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'
      }"
    ></div>
    <div class="info">
      <div class="content">
        <div class="title">{{ props.item.title }}</div>
        <div class="class">
          <div class="item">
            <img src="~@/assets/imgs/date.svg" />
            <span>{{ props.item.updateAt }}</span>
          </div>
          <div class="item">
            <template v-for="item2 in props.item.tags" :key="item2">
              <img src="~@/assets/imgs/tag.svg" />
              <span>{{ item2 }}</span>
            </template>
          </div>
          <div class="item">
            <img src="~@/assets/imgs/cate.svg" />
            <span>{{ props.item.cateName }}</span>
          </div>
        </div>
        <div class="desc">{{ props.item.description }}</div>
      </div>
    </div>
    <div
      v-if="index % 2 === 0"
      class="bg right-bg"
      :style="{
        background: `url(${props.item.surface}) no-repeat`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'
      }"
    ></div>
    <!-- 适配移动端的内容 -->
    <div class="mobile">
      <div
        class="bg"
        :style="{
          background: `url(${props.item.surface}) no-repeat`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }"
      ></div>
      <div class="mobile-info">
        <div class="title">{{ props.item.title }}</div>
        <div class="class">
          <div class="item">
            <img src="~@/assets/imgs/date.svg" />
            <span>{{ props.item.updateAt }}</span>
          </div>
          <div class="item">
            <template v-for="item2 in props.item.tags" :key="item2">
              <img src="~@/assets/imgs/tag.svg" />
              <span>{{ item2 }}</span>
            </template>
          </div>
          <div class="item">
            <img src="~@/assets/imgs/cate.svg" />
            <span>{{ props.item.cateName }}</span>
          </div>
        </div>
        <div class="desc">{{ props.item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any
  index: number
}>()
</script>

<style scoped lang="less">
.blog-item {
  width: inherit;
  height: 280px;
  background: #fff;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  cursor: pointer;
  .mobile {
    display: none;
  }
  &:hover .bg {
    background-size: 115% 115%;
  }
  .bg {
    width: 420px;
    height: inherit;
    transition: all 0.5s;
  }
  .left-bg {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .right-bg {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .top-bg {
    display: none;
    height: 240px;
  }
  .info {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content {
      flex: 0.9;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .class {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        .item {
          margin: 0.5rem 0 0 0.5rem;
          display: flex;
          align-items: center;
          padding-right: 10px;
          border-right: 1px solid #ccc;
          &:nth-child(1) {
            margin-left: 0;
          }
          img {
            width: 15px;
            height: 15px;
            margin-right: 8px;
          }
        }
      }
      .desc {
        margin-top: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 1260px) {
  .bg {
    width: 360px !important;
  }
}
@media (max-width: 800px) {
  .blog-item {
    flex-direction: column;
    height: auto;
    .left-bg,
    .right-bg,
    .info {
      display: none;
    }
    .mobile {
      display: block;
      .bg {
        width: 100% !important;
        height: 220px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .mobile-info {
        padding: 1rem;
        .title {
          font-weight: bold;
          font-size: 20px;
          margin: 1rem 0;
        }
        .class {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          font-size: 14px;
          .item {
            display: flex;
            align-items: center;
            padding-right: 10px;
            border-right: 1px solid #ccc;
            color: #222;
            margin: 10px 10px 0 0;
            &:nth-child(1) {
              margin-left: 0;
            }
            img {
              width: 15px;
              height: 15px;
              margin-right: 8px;
            }
          }
        }
        .desc {
          margin-top: 1rem;
        }
      }
    }
  }
}
@media (max-width: 400px) {
  .mobile {
    .bg {
      height: 150px !important;
    }
  }
}
</style>
