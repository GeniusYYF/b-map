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
      BMap: null,
      map: null,
      sp: null,
      activeProvince: "",
      polygons: [],
      labels: [],
      polygonProvinceStyle: {
        strokeColor: "#F3C569",
        strokeWeight: 0,
        strokeOpacity: 0,
        fillColor: "",
        fillOpacity: 0,
      },
      labelStyle: {
        // color: "red",
        fontSize: "10px",
        fontWeight: "bold",
        color: "rgba(103,109,121,0.5)",
        backgroundColor: "#ffffff00",
        border: "none",
      },
      allProvince:
        "河北省、山西省、辽宁省、吉林省、黑龙江省、江苏省、浙江省、安徽省、福建省、江西省、山东省、河南省、湖北省、湖南省、广东省、海南省、四川省、贵州省、云南省、陕西省、甘肃省、青海省、台湾、内蒙古自治区、广西壮族自治区、西藏自治区、宁夏回族自治区、新疆维吾尔自治区、北京市、天津市、上海市、重庆市、香港、澳门",
      labelOffset: {
        河北省: [-2, -0.3],
        青海省: [-1, 1],
        甘肃省: [1.5, 0.5],
        宁夏回族自治区: [-1, 0],
        内蒙古自治区: [-0.2, -3],
        黑龙江省: [0, -1.2],
        辽宁省: [0, 0.5],
        // 北京市: [-0.5, 0.5],
        // 天津市: [-0.5, 0.5],
        山西省: [-1, 0],
        陕西省: [0, -1],
        四川省: [-1, 1],
        // 重庆市: [-0.6, 0],
        河南省: [-0.5, 0.5],
        山东省: [-1, 0],
        // 安徽省: [-0.5, -0.5],
        湖南省: [-0.6, 0.6],
        江西省: [0, 0.5],
        浙江省: [-1, 0.5],
        福建省: [-1, 0.5],
        云南省: [-1, -0.5],
        广西壮族自治区: [0, 0.6],
        广东省: [-0.5, 1],
        台湾: [-0.6, 0.5],
        海南省: [-0.5, 0.2],
      },
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(map, BMap) {
      this.map = map;
      this.BMap = BMap;
      // 加载省份轮廓
      this.loadAreaEdge("", this.allProvince.split("、"), false);
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
        polygon.addEventListener("onmouseover", (e) => {
          if (this.BMap.$refs.selectPolygonLayer?.level === 0) {
            if (this.sp) {
              this.map.removeOverlay(this.sp);
            }
            if (polygon.getFillOpacity() === 0) {
              this.sp = new BMapGL.Polygon(this.loadEdgePath(path, name));
              this.sp.setFillColor("#F3C569");
              this.map.addOverlay(this.sp);
              this.sp.addEventListener("onmouseout", (e) => {
                this.map.removeOverlay(this.sp);
              });
            }
          }
        });
        polygon.addEventListener("onclick", (e) => {
          console.log(e, name);
          if (this.BMap.$refs.selectPolygonLayer?.level === 0) {
            this.BMap.$refs.selectPolygonLayer.loadAreaEdgeLayer(name, 1);
          }
        });
        var center = polygon.getBounds().getCenter();
        var offsetList = this.labelOffset[name] || {};
        var point = new BMapGL.Point(
          center.lng + (offsetList[0] || 0),
          center.lat + (offsetList[1] || 0)
        );
        // var cityCenter = mapv.utilCityCenter.getCenterByCityName(name);
        var labelName = name.replace("省", "").replace("市", "");
        var label = new BMapGL.Label(labelName, {
          position: point,
          //   position: new BMapGL.Point(cityCenter.lng,cityCenter.lat),
          enableMassClear: isClear,
        });
        label.setStyle(this.labelStyle);
        // label.setZIndex(0);
        this.polygons.push(polygon);
        this.labels.push(label);
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
    show() {
      let i = 0;
      for (let item of this.polygons) {
        this.map.addOverlay(item);
        this.map.addOverlay(this.labels[i]);
        i++;
      }
    },
    hide() {
      let i = 0;
      for (let item of this.polygons) {
        this.map.removeOverlay(item);
        this.map.removeOverlay(this.labels[i]);
        i++;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>