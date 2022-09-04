// index.js
// 获取应用实例
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    close_open:true,
    color1:"#1989fa",
    color2:"#000000",
    hasUserInfo: false,
    c_rotate:false,
    openlist:[],
    empty:false,
    rotate_style:'transition:1500ms ease 500ms;transform:rotate(180deg);transition-property:transform;transform-origin:50% 50% 0;-webkit-transition:1500ms ease 500ms;-webkit-transform:rotate(180deg);-webkit-transition-property:transform;-webkit-transform-origin:50% 50% 0',
    animationData:'',
    widheight: 0,
    widwidth: 0,
    close:{
      have_time: true,
      list_item: [{title: "给未来的你写一封信", start: "2022/08/27 10:50", end: "2022/09/01 12:36", num: 90,during:"432000000",
    context:"hey kong 我坐在最后一排给你写信，窗外球场很安静，数学课我听不进，给我发来简讯 说星期六去坐船和她姐妹一起 我不想去我不想读书了，但我得给爸妈一个交代"
    }]
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  timedifference: function (faultDate, completeTime,id=0) {
    var stime = Date.parse(new Date(faultDate));//获得开始时间的毫秒数
    var etime = Date.parse(new Date(completeTime));//获得结束时间的毫秒数
    var usedTime = etime - stime; //两个时间戳相差的毫秒数
    if(id==1)return usedTime
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    if(days>0){
      return days+"days"
    }
    //计算出小时数
    var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));//将剩余的毫秒数转化成小时数
    if(hours>0){
      return hours+'h'
    }
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));//将剩余的毫秒数转化成分钟
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);//计算分钟数后剩余的毫秒数
    var seconds = Math.floor(leave3/1000);//将剩余的毫秒数转化成秒数

    var dayStr = days == 0 ? "" : days + "d:";
    var hoursStr = hours == 0 ? "" : hours + "h:";
    var minutesStr = minutes == 0 ? "" : minutes + "m:"
    var time = dayStr + hoursStr + minutesStr + seconds + "s";
    return time;
    },//计算两个时间之间的时间差
  // 前往详细信息页
  getList(){
    let list1 = JSON.parse(wx.getStorageSync('close') || '[]')
    var list=list1.list_item
    var templist=[]
    var templist2=[]
    var now=util.formatTime(new Date())
    for(var i=0;i<list.length;i++){
      list[i].during=this.timedifference(list[i].start,list[i].end,1)
      list[i].dif=this.timedifference(now,list[i].end)
      list[i].num=100-(Number(this.timedifference(now,list[i].end,1))/Number(list[i].during))*100
      if(list[i].num<100){
        templist.push(list[i])
      }else{
        templist2.push(list[i])
      }
    }
    var close1=this.data.close
    close1.list_item=templist
    // console.log(close1);
    this.setData({
      close:close1,
      openlist:templist2
    })
    // wx.setStorageSync('close', JSON.stringify(this.data.close))
  },
  // 改变图片的颜色
  start:function(){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
      delay: 200
    });
    animation.rotate(180).step()
    this.setData({
      ani:  animation.export()
    })
  },
  gotoWrite(){
    // this.start()
    this.setData({
      c_rotate:false
    })
   var timer=setTimeout(()=>{
    this.setData({
      c_rotate:true
    })
   },10)
    
    var timer=setTimeout(()=>{
      wx.navigateTo({
        url: '/pages/write/write',
      })
    },1000)
  },
  change(e){
    let num=e.currentTarget.dataset.id
    if(num==0){
      this.setData({
        color1:"#000000",
        color2:"#1989fa",
        close_open:false
      })
    }else{
      this.setData({
        color1:"#1989fa",
        color2:"#000000",
        close_open:true
      })
    }
  },
  onLoad() {
    // this.start()
    this.setData({
      c_rotate:true
    })
    // wx.setStorageSync('close', JSON.stringify(this.data.close))
    let close1 = JSON.parse(wx.getStorageSync('close') || '[]')
    console.log("get",close1);
    this.setData({
      close:close1
    })
    // this.getList();
    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          widheight: res.screenHeight,
          widwidth: res.screenWidth/2
        });
      }
    });
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    let close1 = JSON.parse(wx.getStorageSync('close') || '[]')
    console.log("get",close1);
    this.setData({
      close:close1
    })

    if(this.data.close.list_item.length == 0){
      this.setData({
        empty:true
      })
    }else{
      this.setData({
        empty:false
      })
    }
    setInterval(() => {
      this.getList()
    }, 1000);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
