const common = require("../../utils/common")

// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        art: {},
        isadd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    addlike(options){
        let art=this.data.art;
        wx.setStorageSync(art.id, art)
        this.setData({
            isadd:true
        })
    },
    cancalLike(){
        let art=this.data.art;
        wx.removeStorageSync(art.id)
        this.setData({
            isadd:false
        })
    },
    onLoad: function (options) {
        let id = options.id
        var art = wx.getStorageSync(id)
        if (art != "") {
            this.setData({
                art: art,
                isadd: true
            })
        } else {
            let res = common.getNewsDetail(id)
            if (res.code == '200') {
                this.setData({
                    art: res.news
                })
            }
        }
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