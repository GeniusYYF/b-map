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
      chinaPolygonStyle: {
        strokeColor: "rgb(231,137,88)",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillColor: "rgba(89, 233, 179, 0)",
        fillOpacity: 0,
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
      // 禁止覆盖物在map.clearOverlays方法中被清除
      this.polygon.disableMassClear();
      this.map.addOverlay(this.polygon);
    },
    show() {
      this.map.addOverlay(this.polygon);
    },
    hide() {
      this.map.removeOverlay(this.polygon);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>