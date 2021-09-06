import Vue from "vue";
import VueRouter from "vue-router";
// 首页
import Home from "../components/Home.vue";
// 热歌榜
import HotMusic from "../views/HotMusice.vue";
// 搜索页面
import Search from "../views/Search.vue";
// import Recommend from '../views/Recommend.vue'
// 播放列表
import PlayList from "../views/PlayList.vue";
// 搜索结果页面
import SearchSongList from "../views/SearchSongList.vue";
// 登录页面
// import Login from "../views/Login.vue";
// 首页MV入口组件
import MusicMv from "../components/musicMv.vue";

Vue.use(VueRouter);

const routes = [
  // 定义一个重定向，默认为登录页面
  { path: "/", redirect: "/home" },
  {
    path: "/musicmv",
    name: "musicmv",
    component: MusicMv,
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: Login,
  // },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { showTabBar: true },
  },
  {
    name: "search",
    path: "/search",
    component: Search,
    meta: { showTabBar: true },
  },
  {
    name: "hotMusic",
    path: "/hotMusic",
    component: HotMusic,
    meta: { showTabBar: true },
  },
  {
    name: "playlist",
    path: "/playlist",
    component: PlayList,
  },
  {
    name: "searchsonglist",
    path: "/searchsonglist",
    component: SearchSongList,
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, form, next) => {
//   if (to.path === "/home") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });

export default router;
