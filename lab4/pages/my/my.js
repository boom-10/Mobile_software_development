// pages/my/my.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

    /**
     * 页面的初始数据
     */
    data: {
        news_list:[],
        photo:"/images/index.png",
        nickname:"未命名",
        is_login:false
    },
    getMyLike(){
        let info =wx.getStorageInfoSync()
        let keys=info.keys
        let myList=[]
        for(var i=0;i<keys.length;i++){
            let obj=wx.getStorageSync(keys[i]);
            console.log(keys);
            if(keys[i]!='logs') 
            myList.push(obj);
        }
        this.setData({
            news_list:myList
        })
    },
    goToDetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../detail/detail?id='+id,
        })
    },
    getUserProfile(e) {
        var that=this
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        if(!this.data.is_login){
            wx.getUserProfile({
                desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                  console.log(res)
                  that.getMyLike()
                  this.setData({
                    nickname: res.userInfo.nickName,
                    hasUserInfo: true,
                    is_login:true,
                    photo:res.userInfo.avatarUrl,
                  })
                }
              })
        }
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.is_login){
            this.getMyLike()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})