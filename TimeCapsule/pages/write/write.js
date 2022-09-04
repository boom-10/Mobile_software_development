// pages/write/write.js
var util = require('../../utils/util.js');
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      text_val:'',
      minHour: 0,
      value2:'',
      maxHour: 24,
      havetitle:false,
      haveText:false,
      minDate: new Date().getTime(),
      maxDate: new Date(2099, 12, 31).getTime(),
      currentDate: new Date().getTime(),
      show: false,
      fileList: [],
      currentChoose: new Date().getTime()
      },
      submitFun(){
        console.log(this.compareTimeNow(this.data.currentChoose));
        if(!this.compareTimeNow(this.data.currentChoose)){
          Notify({ type: 'primary', message: '请选择一个将来的时间哦' });
        }
        else if(this.data.value2 == undefined || this.data.value2 == null || this.data.value2 == ''){
          Notify({ type: 'primary', message: '请输入主题哦' });
        }else if(this.data.text_val == undefined || this.data.text_val == null || this.data.text_val == ''){
          Notify({ type: 'primary', message: '请输入信件内容哦' });
        }else{
          var list_item1={};
          list_item1.context=this.data.text_val;
          list_item1.end=this.data.currentChoose;
          var now=util.formatTime(new Date());
          list_item1.start=now.slice(0,16)
          list_item1.title=this.data.value2;
          let close = JSON.parse(wx.getStorageSync('close') || '{}')
          if(Object.keys(close).length ==0){
            close.list_item=[],
            close.have_time=true
          }
          close.list_item.push(list_item1)
          console.log("write",close);
          wx.setStorageSync('close', JSON.stringify(close))
          Notify({ type: 'success', message: '发布成功' });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }, 1000);
        }
      },
      bindTextInput(e){
        var val=e.detail
        this.setData({
          text_val:val,
          haveText:true
        })
      },
      bindKeyInput: function(e){
        var val=e.detail
        this.setData({
          value2:val,
          havetitle:true
        })
      },
      openPicker() {
        this.setData({ show: true })
      },
      onConfirm(e) {
        this.setData({ show: false, currentChoose: this.formatDate(new Date(e.detail)) })
      },
      onClose() {
        this.setData({ show: false })
      },
      onCancel() {
        this.setData({ show: false })
      },
      formatDate(date) {
        let taskStartTime
        if (date.getMonth() < 9) {
          taskStartTime = date.getFullYear() + "/0" + (date.getMonth() + 1) + "/"
        } else {
          taskStartTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/"
        }
        console.log(date.getDate());
        if (date.getDate() < 10) {
          taskStartTime += "0" + date.getDate()
        } else {
          taskStartTime += date.getDate()
        }
        taskStartTime += " "
        console.log(date.getHours());
        if (date.getHours() < 10) {
          taskStartTime += "0" + date.getHours()+':'
        } else {
          taskStartTime += date.getHours()+':'
        }
        console.log(date.getMinutes());
        if (date.getMinutes() < 10) {
          taskStartTime += "0" + date.getMinutes()
        } else {
          taskStartTime += date.getMinutes()
        }
        return taskStartTime;
      },
      compareTimeNow(time){
        console.log("hello");
        var strArray = time.split(" ");
        var strDate = strArray[0].split("/"); 
        var strTime = strArray[1].split(":"); 
        var newTime=new Date(time);
        var now = new Date();
        if(newTime.getTime()>=now.getTime()){
            return true;
        }else{
            return false;
        }
    },
      _addImg() {
        let _this = this;
        // 此方法为微信小程序自带api 详情访问https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html
        wx.chooseImage({
          count: 5,
          success(res) {
            //此处会返回图片暂存路径和文件大小
            const data = res.tempFiles;
            _this.setFile(data)
          }
        })
      },
      setFile (data) {
        // 将wx.chooseImage返回的数据进行扩展
        data.map((item, index) => {
          // 通过路径截取文件后缀名
          const fileFormat = item.path.substring(item.path.lastIndexOf(".") + 1, item.path.length);
          // wx.getFileSystemManager()小程序文件管理器api，可以将通过文件路径将其转换成64编码
          const fileManager = wx.getFileSystemManager();
          const base64 = fileManager.readFileSync(item.path, 'base64');
          item.fileContent = base64;
          item.fileSize = item.size;
          // 通过时间获取随机13位随机数并且拼接文件后缀进行文件命名
          item.fileName = this.getFileName(13) + '.' + fileFormat;
          // 此处操作是用来进行选中图片显示的，只有这样拼接才能显示base64编码的路径
          item.path = `data:image/${fileFormat};base64,${base64}`;;
        })
        this.setData({ 
          fileList: this.data.fileList.concat(data)
        });
        // 此处操作是用来将获取到的文件数据传递给父组件进行文件上传
        this.triggerEvent('imageChange', this.data.fileList)
      },
      // 随机生成文件名
      getFileName (m) {
        m = m > 13 ? 13 : m;
        var num = new Date().getTime();
        return num.toString().substring(13 - m);
      },
      //点击进行图片删除
      _onDelTab(e) {
        // 获取图片索引
        let idx = e.currentTarget.dataset.idx;
        let delFile = this.data.fileList[idx];
        console.log(delFile);
        this.data.fileList.splice(idx, 1);
        this.setData({
          fileList: this.data.fileList
        })
        this.triggerEvent('imageDel', delFile);
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        currentChoose:util.formatNextDay(new Date())
      })
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