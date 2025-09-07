import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      imgLoadStatus: false, // 壁纸加载状态
      innerWidth: null, // 当前窗口宽度
      coverType: "0", // 壁纸种类
      siteStartShow: false, // 建站日期显示
      backgroundShow: false, // 壁纸展示状态
      boxOpenState: false, // 盒子开启状态
      mobileOpenState: false, // 移动端开启状态
      mobileFuncState: false, // 移动端功能区开启状态
      setOpenState: false, // 设置页面开启状态
      footerBlur: true, // 底栏模糊
      isLoggedIn: false, // 用户登录状态
      userInfo: null, // 用户信息
      token: null, // 用户token
    };
  },
  getters: {
    // 获取页面宽度
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    // 更改当前页面宽度
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    // 更改播放状态
    setPlayerState(value) {
      if (value) {
        this.playerState = false;
      } else {
        this.playerState = true;
      }
    },
    // 更改壁纸加载状态
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
    // 设置用户登录状态
    setLoginState(value) {
      this.isLoggedIn = value;
    },
    // 设置用户信息
    setUserInfo(value) {
      this.userInfo = value;
    },
    // 设置用户token
    setToken(value) {
      this.token = value;
    },
    // 用户登录
    login(userData, token = null) {
      this.isLoggedIn = true;
      this.userInfo = userData;
      this.token = token;
      return token;
    },
    // 用户登出
    logout() {
      this.isLoggedIn = false;
      this.userInfo = null;
      this.token = null;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "siteStartShow",
      "footerBlur",
      "isLoggedIn",
      "userInfo",
      "token",
    ],
  },
});
