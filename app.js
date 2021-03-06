/*
 * @Author: holder
 * @Date: 2021-01-08 14:01:21
 * @LastEditors: holder
 * @LastEditTime: 2021-04-09 14:42:40
 * @Description: 
 */
//app.js
const Utils = require('./utils/util')
App({
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight; // 窗口高度
        this.globalData.scrollHeight =  res.windowHeight - navHeight - 140
      },
      fail(err) {
        console.log(err);
      }
    })
    const version = wx.getSystemInfoSync().SDKVersion
    if (Utils.compareVersion(version, '2.9.3') < 0) {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  },
  globalData: {
    userInfo: {},
    header: {},
    baseURL: 'http://192.168.0.191:8344/api/',
    proStatus: {
      beforeConfirm: 1,
      confirmed: 0,
      deprecated: 2
    },
    navHeight:60, // 默认导航栏高度60
    degStatus: ['待受理', '已受理', '出具报告中', '报告审核中', '已出具报告'],
    // degStatusMap: new Map([[1,'待受理'], [2,'已受理'], [3,'出具报告中'], [4,'报告审核中'], [5,'已出具报告']]),
    degStatusMap:{
      1:'待受理',
      2:'已受理',
      3:'出具报告中',
      4:'报告审核中',
      5:'已出具报告'
    },
    // 主账号，送样员，质监员，见证员，建设单位联系人
    roles:['ROLE_PRINCIPAL','ROLE_DELIVERER','ROLE_QUALITY','ROLE_WITNESSES','ROLE_CONSTRUCTION'],
    fileTypes:new Map([['projectAdd',0],['projectEdit',1],['sampleAdd',2],['sampleEdit',3],['reportEvaluate',4]]),
    // 用户对项目具备的角色
    userProRoles:null
  }
})
