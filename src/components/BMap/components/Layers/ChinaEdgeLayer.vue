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
      polygon: null,
      polygonMask: null,
      chinaPolygonStyle: {
        strokeColor: "rgb(231,137,88)",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillColor: "rgba(89, 233, 179, 0)",
        fillOpacity: 0,
      },
      maskPolygonStyle: {
        strokeColor: "rgba(231,137,88,0)",
        strokeWeight: 0,
        strokeOpacity: 0,
        fillColor: "rgba(64, 73, 90, 1)",
        fillOpacity: 0.5,
      },
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(map) {
      this.map = map;
      this.loadChinaEdgePath();
    },
    loadChinaEdgePath() {
      let list = require("@/assets/mapEdgeJson/china.json").coordinates[0][0];
      let paths = [];
      for (let point of list) {
        paths.push(new BMapGL.Point(point[0], point[1]));
      }
      this.polygon = new BMapGL.Polygon(paths, this.chinaPolygonStyle);

      let outerBoundary = new BMapGL.Bounds(
        new BMapGL.Point(0, -90),
        new BMapGL.Point(0, 90)
      );
      console.log(outerBoundary);
      let outerList = [
        new BMapGL.Point(-180, 90),
        new BMapGL.Point(180, 90),
        new BMapGL.Point(180, -90),
        new BMapGL.Point(-180, -90),
      ];
      this.polygonMask = new BMapGL.Polygon(
        [outerList, paths],
        this.maskPolygonStyle
      );
      // 禁止覆盖物在map.clearOverlays方法中被清除
      this.polygon.disableMassClear();
      this.polygonMask.disableMassClear();

      this.map.addOverlay(this.polygon);
      this.map.addOverlay(this.polygonMask);
    },
    show() {
      this.map.addOverlay(this.polygon);
    },
    hide() {
      this.map.removeOverlay(this.polygon);
    },
    showMask() {
      this.map.addOverlay(this.polygonMask);
    },
    hideMask() {
      this.map.removeOverlay(this.polygonMask);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>