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
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/classification',
    name: 'classification',
    component: () => import('../views/classification/Classification.vue')
  },
  {
    path: '/cate',
    component: () => import('../views/cate/Cate.vue')
  },
  {
    path: '/tag',
    component: () => import('../views/tag/Tag.vue')
  },
  {
    path: '/link',
    component: () => import('../views/link/Link.vue')
  },
  {
    path: '/about',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/leaveword',
    component: () => import('../views/leaveword/Leaveword.vue')
  },
  {
    path: '/moment',
    component: () => import('../views/moment/Moment.vue')
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('../views/articleDetail/ArticleDetail.vue'),
    props: true
  },
  {
    path: '/momentDetail/:id/:isLike',
    name: 'momentDetail',
    component: () => import('../views/momentDetail/MomentDetail.vue'),
    props: true
  },
  {
    path: '/cate-article/:total/:name/:id',
    name: 'cate-article',
    component: () => import('../views/cateArticle/CateArticle.vue'),
    props: true
  },
  {
    path: '/tag-article/:id/:name',
    name: 'tag-article',
    component: () => import('../views/tagArticle/TagArticle.vue'),
    props: true
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/notFound/NotFound.vue')
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

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
