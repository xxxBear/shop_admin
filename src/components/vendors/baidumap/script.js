import BMap from 'BMap'

export default {
  created () {

  },

  mounted () {
    this.initBMap()
  },

  data () {
    return {

    }
  },

  methods: {
    initBMap () {
      var map = new BMap.Map('bdmap')
      // 创建地图实例
      var point = new BMap.Point(114.4538502106, 30.4906283262)
      // 创建点坐标
      map.centerAndZoom(point, 16)
      // 初始化地图，设置中心点坐标和地图级别

      // 地图控件
      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.OverviewMapControl())
      map.addControl(new BMap.MapTypeControl())

      map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
    }
  }
}
