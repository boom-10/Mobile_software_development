// index.js
// 获取应用实例
Page({
  data: {
    region:['山东省','青岛市','崂山区'],
    nowInfo:[{
      name:"温度",
      num:''
    },{
      name:"气压",
      num:''
    },{
      name:"能见度",
      num:''
    },{
      name:"风向",
      num:''
    },{
      name:"风速",
      num:''
    },{
      name:"风力",
      num:''
    }],
    temp:0,
    weather:'晴',
    imgsrc:'999-fill',
    localID:101120202
  },
  regionChange(e){
    this.setData({
      region:e.detail.value,
    })
    this.getLocationID(e.detail.value[1],e.detail.value[2])
    this.getinfo(this.localID)
  },
  getinfo(id){
    var that=this
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?',
      data:{
        location:id,
        key:'583ed323bb62490dba0158e445e81d2f'
      },
      success(res){
        var resdata=res.data.now
        console.log(resdata);
        var restemp=resdata.temp
        that.setData({
          temp:restemp,
          weather:resdata.text,
          imgsrc:resdata.icon,
          nowInfo:[{
            name:"湿度",
            num:resdata.humidity+'%'
          },{
            name:"气压",
            num:resdata.pressure+'hPa'
          },{
            name:"能见度",
            num:resdata.vis+'km'
          },{
            name:"风向",
            num:resdata.windDir
          },{
            name:"风速",
            num:resdata.windSpeed+'km/h'
          },{
            name:"风力",
            num:resdata.windScale+'级'
          }]
        })
      }
    })
  },
  getLocationID(city,area){
    var that=this
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      method:"GET",
      data:{
        location:area,
        adm:city,
        key:'583ed323bb62490dba0158e445e81d2f'
      },
      success:function(res){
        that.getinfo(res.data.location[0].id)
        that.setData({
          localID:res.data.location[0].id
        })
      }
    })
  },
  
  onLoad() {
    this.getLocationID('青岛','崂山区')
    this.getinfo(101120202)
  },

})
