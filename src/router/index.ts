import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/classification',
    name: 'classification',
    component: () => import('../views/classification/Classification.vue'),
    meta: {
      title: '归档'
    }
  },
  {
    path: '/cate',
    component: () => import('../views/cate/Cate.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/tag',
    component: () => import('../views/tag/Tag.vue'),
    meta: {
      title: '标签'
    }
  },
  {
    path: '/link',
    component: () => import('../views/link/Link.vue'),
    meta: {
      title: '友链'
    }
  },
  {
    path: '/about',
    component: () => import('../views/about/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/leaveword',
    component: () => import('../views/leaveword/Leaveword.vue'),
    meta: {
      title: '留言'
    }
  },
  {
    path: '/moment',
    component: () => import('../views/moment/Moment.vue'),
    meta: {
      title: '说说'
    }
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('../views/articleDetail/ArticleDetail.vue'),
    props: true,
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/momentDetail/:id/:isLike',
    name: 'momentDetail',
    component: () => import('../views/momentDetail/MomentDetail.vue'),
    props: true,
    meta: {
      title: '说说详情'
    }
  },
  {
    path: '/cate-article/:total/:name/:id',
    name: 'cate-article',
    component: () => import('../views/cateArticle/CateArticle.vue'),
    props: true,
    meta: {
      title: '分类文章'
    }
  },
  {
    path: '/tag-article/:id/:name',
    name: 'tag-article',
    component: () => import('../views/tagArticle/TagArticle.vue'),
    props: true,
    meta: {
      title: '标签文章'
    }
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
    meta: {
      title: '信息管理'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/notFound/NotFound.vue'),
    meta: {
      title: '404~'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0
    }
  }
})

router.beforeEach(to => {
  NProgress.start()
  document.title = to.meta.title as string
})
router.afterEach(() => {
  NProgress.done()
})

export default router
