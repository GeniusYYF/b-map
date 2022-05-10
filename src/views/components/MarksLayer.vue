<template>
  <div></div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  mixin: {},
  data: function () {
    return {
      map: null,
      view: null,
      heatmap: null, // 热力图
      allBounds: [], // 自定义所有区域 - 方形
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    init(map, view) {
      this.map = map;
      this.view = view;
      this.loadMockRange();
      this.loadHotLayer();
      // this.heatmap.show();
    },
    // 模拟数据范围
    loadMockRange() {
      let ranges = require("@/assets/chinaRange.json");
      let paths = [];
      for (let item of ranges) {
        for (let point of item) {
          paths.push(new BMapGL.Point(point[0], point[1]));
        }
        this.allBounds.push(
          new BMapGL.Polygon(paths, {
            strokeOpacity: 0,
            fillOpacity: 0,
          }).getBounds()
        );
        paths = [];
      }
    },
    loadHotLayer() {
      let data = this.getRandomData(0, 10, 2000);
      let res = [];
      for (let item of data) {
        res.push({
          geometry: {
            type: "Point",
            coordinates: [item[0], item[1]],
          },
          properties: {
            count: item[2],
          },
        });
      }
      this.heatmap = new mapvgl.HeatmapLayer({
        size: 50, // 单个点绘制大小
        max: 50, // 最大阈值
        height: 10, // 最大高度，默认为0
        unit: "px", // 单位，m:米，px: 像素
        gradient: {
          // 对应比例渐变色
          0.25: "rgba(89, 233, 179, 1)",
          0.55: "rgba(182, 243, 147, 1)",
          0.85: "rgba(254, 255, 140, 1)",
          0.95: "rgba(217, 29, 28, 1)",
        },
      });
      this.heatmap.setData(res);
      this.heatmap.hide();
      this.view.addLayer(this.heatmap);
    },
    getRandomData(minVal = 0, maxVal = 100, num = 100) {
      const range = {
        minLng: 73.33,
        minLat: 3.51,
        maxLng: 135.05,
        maxLat: 53.33,
      };
      let lng,
        lat,
        val,
        paths = [];
      let push = false;
      for (let i = 0; i < num; i++) {
        lng = this.randomNum(range.minLng, range.maxLng);
        lat = this.randomNum(range.minLat, range.maxLat);
        val = this.randomNum(minVal, maxVal);
        for (let item of this.allBounds) {
          if (item.containsPoint(new BMapGL.Point(lng, lat))) {
            paths.push([lng, lat, val]);
            push = true;
            break;
          }
          push = false;
        }
        if (!push) {
          i--;
        }
      }
      return paths;
    },
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>