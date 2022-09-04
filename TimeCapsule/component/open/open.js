// component/close.js
var util = require('../../utils/util.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        close: {
            type: Object,
            value: {},
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
   
    methods: {
        gotoInfo1(e) {
            let item = e.currentTarget.dataset.item
            console.log(item);
            item = JSON.stringify(item)
            console.log(item);
            wx.navigateTo({
                url: '../info/info?item=' + item,
            })
        },
        del(e) {
            let item = e.currentTarget.dataset.item
            // console.log('hello');
            console.log('item',item.title);
            let close1 = JSON.parse(wx.getStorageSync('close') || '[]')
            for (let index = 0; index < close1.list_item.length; index++) {
                var element = close1.list_item[index];
                console.log(element.title);
                if(item.title==element.title&&item.start==element.start){
                    close1.list_item.splice(index,1)
                }
            }
            console.log(close1);
            var templist=this.data.close
            for (let index = 0; index < templist.length; index++) {
                const element = templist[index];
                if(item.title==element.title&&item.start==element.start){
                    templist.splice(index,1)
                }
            }
            this.setData({
                close:templist,
                empty:templist.length>0?false:true
            })
            wx.setStorageSync('close', JSON.stringify(close1))
        }
    }
})