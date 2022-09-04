// component/close.js
import Notify from "../miniprogram_npm/@vant/weapp/notify/notify";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        close:{
            type:Object,
            value:{}
        },
        empty:{
            type:Boolean,
            value:true
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
    attached(){
        console.log(this.data.close);
    },
    methods: {
        del(e){
            let item = e.currentTarget.dataset.item
            // console.log('hello');
            let close1 = this.data.close
            for (let index = 0; index < close1.list_item.length; index++) {
                var element = close1.list_item[index];
                console.log(element.title);
                if(item.title==element.title&&item.start==element.start){
                    close1.list_item.splice(index,1)
                }
            }
            this.setData({
                close:close1,
            })
            console.log(this.data.close);
            wx.setStorageSync('close', JSON.stringify(close1))
        },
        console(e){
        Notify({ type: 'primary', message: '还未到开启时间哦',context:this });
            // let item=e.currentTarget.dataset.item
            // item=JSON.stringify(item)
            // wx.navigateTo({
            //   url: '../info/info?item='+item,
            // })            
        }
    }
})
