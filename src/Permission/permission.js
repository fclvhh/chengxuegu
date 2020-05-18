/**
 * 权限校验
 *  1. 路由跳转前 , 进行判断是否登录
 *  2. 如果登录 . 进行路由跳转 , 没有就跳转到登录页
 * 实现方式 :
 *  routerd的钩子函数 beforeEach() : 拦截所有的路由跳转
 */

import router from "@/router";
import { getUserInfo } from "@/api/login";

router.beforeEach((to, from, next) => {
  //  获取token
  /**
   * 1.如果没有token , 说明用户没有登录 , 或者token过期 , 总之是希望 : 用户重新登录
   * 2. 如果有token, 继续判断有没有用户信息
   *    有 :  那就随便你跳转
   *    没有 : 那就去取信息
   *          取到就 存起来 , 放行
   *          取不到 , 那就重新登录
   */
  const token = localStorage.getItem("chengxuegu-msm-token");
  console.log(token);
  if (token) {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      // 说明就是要去登录页 , 那就放行
      next();
    }
  } else {
    const userInfo = localStorage.getItem("chengxuegu-msm-user");
    console.log(userInfo);
    console.log("hi");
    if (userInfo) {
      next();
    } else {
      getUserInfo(token).then((res) => {
        const resData = res.data;
        if (resData.flag) {
          localStorage.setItem(
            "chengxuegu-msm-user",
            JSON.stringify(resData.data)
          );
          next();
        } else {
          next({ path: "/login" });
        }
      });
    }
  }
});
