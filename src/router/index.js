import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/views/login";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: {
        title: "首页",
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录",
        noNeedLogin: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!to.meta.noNeedLogin) {
    if (window.localStorage.getItem("isLogin")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
router.afterEach(function(to, from) {
  document.title = to.meta.title; //跳转后设置页面的title
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;
