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
      prismStyle: {
        topFillColor: "#F3C569",
        topFillOpacity: 0.3,
        sideFillColor: "#ffd33a",
        sideFillOpacity: 0.5,
      },
      polygonProvinceStyle: {
        strokeColor: "#F3C569",
        strokeWeight: 1,
        strokeOpacity: 1,
        fillColor: "rgba(89, 233, 179, 0)",
        fillOpacity: 0,
      },
      polygonSelectStyle: {
        strokeColor: "#F3C569",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillColor: "rgba(89, 233, 179, 0)",
        fillOpacity: 0,
      },
      labelStyle: {
        // color: "red",
        fontSize: "12px",
        fontWeight: "bold",
        color: "rgb(231,137,88)",
        backgroundColor: "#ffffff00",
        border: "none",
      },
      allAnHui:
        "合肥市、芜湖市、蚌埠市、淮南市、马鞍山市、淮北市、铜陵市、安庆市、黄山市、滁州市、阜阳市、宿州市、六安市、亳州市、池州市、宣城市",
      allHuangShan: "黄山区、徽州区、祁门县、歙县、屯溪区、休宁县、黟县",
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(map) {
      this.map = map;
    },
    loadAreaEdgeLayer(name, level) {
      let levelDict = { 1: 8.5, 2: 10.5, 3: 11.5, 4: 13 };
      let highDict = { 1: 10000, 2: 5000, 3: 3000, 4: 1000 };
      new BMapGL.Boundary().get(name, (res) => {
        let point = null;
        var count = res.boundaries.length; //行政区域的点有多少个
        // 某区域可能有多个范围，所以用循环
        for (var i = 0; i < count; i++) {
          var path = [];
          var str = res.boundaries[i].replace(" ", "");
          var points = str.split(";");
          for (var j = 0; j < points.length; j++) {
            var lng = points[j].split(",")[0];
            var lat = points[j].split(",")[1];
            path.push(new BMapGL.Point(lng, lat));
          }
          //   加载选中区域轮廓和高度图层
          var prism = new BMapGL.Prism(path, highDict[level], this.prismStyle);
          var polygon = new BMapGL.Polygon(path, this.polygonSelectStyle);
          this.map.addOverlay(prism);
          this.map.addOverlay(polygon);
          point = polygon.getBounds().getCenter();
        }

        // 加载安徽省区划
        if (name === "安徽省") {
          this.loadAreaEdge("anhui/", this.allAnHui.split("、"), true);
        } else if (name === "黄山市") {
          this.loadAreaEdge(
            "anhui/huangshan/",
            this.allHuangShan.split("、"),
            true
          );
        }
        if (this.allHuangShan.split("、").includes(name)) {
          this.loadAreaEdge("anhui/huangshan/", [name]);
        }
        // this.map.flyTo(point, levelDict[level]);
        // this.map.centerAndZoom(name, levelDict[level]);
        this.map.centerAndZoom(name);
        // this.map.setTilt(50);
      });
    },
    // 加载其他边界
    loadAreaEdge(path, list, isClear = true) {
      // 加载所有省份轮廓
      for (let name of list) {
        var polygon = new BMapGL.Polygon(
          this.loadEdgePath(path, name),
          this.polygonProvinceStyle
        );
        isClear ? "" : polygon.disableMassClear();

        var cityCenter = mapv.utilCityCenter.getCenterByCityName(name);
        cityCenter = cityCenter || polygon.getBounds().getCenter();
        var labelName = name.replace("省", "").replace("市", "");
        var label = new BMapGL.Label(labelName, {
          position: new BMapGL.Point(cityCenter.lng, cityCenter.lat),
          enableMassClear: isClear,
        });
        label.setStyle(this.labelStyle);

        this.map.addOverlay(polygon);
        this.map.addOverlay(label);
      }
    },
    // 加载本地数据
    loadEdgePath(path, name) {
      let res = [];
      let list = require("@/assets/mapEdgeJson/province/" +
        path +
        name +
        ".json").coordinates[0][0];
      for (let point of list) {
        res.push(new BMapGL.Point(point[0], point[1]));
      }
      return res;
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>