//app.js
App({
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
            navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
            navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogined: false,
    header: {},
    baseURL:'http://192.168.0.191:8342/api/',
    proStatus: {
      beforeConfirm: 1,
      confirmed: 0,
      deprecated: 2
    },
    degStatus:['待受理','已受理','出具报告中','报告审核中','已出具报告']
  }
})
