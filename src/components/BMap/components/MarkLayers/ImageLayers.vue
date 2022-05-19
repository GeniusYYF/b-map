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
      layerDict: {
        base: { layer: null, offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 } }, // -0.7349
        nzw: { layer: null, offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 } },
        "nzw-hq": {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        cd: { layer: null, offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 } },
        "cd-hq": {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        ld: { layer: null, offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 } },
        "ld-hq": {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        gd: { layer: null, offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 } },
        "gd-hq": {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        gq: {
          layer: null,
          offset: { x1: 0.4119, y1: -0.1914, x2: 0.4961, y2: -0.3354 },
        },
        qxghzhzs: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        jsjpzs: {
          layer: null,
          offset: { x1: 0, y1: 0, x2: 0, y2: -1.1349 },
        },
        bzhjszs: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        swqxcp: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        jhlslcp: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        trsqygjc: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base1: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base2: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base3: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base4: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base5: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base6: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base7: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base8: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base9: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base10: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base11: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
        base12: {
          layer: null,
          offset: { x1: 0, y1: -0.27, x2: 0, y2: -0.7349 },
        },
      },
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    init() {
      var pStart, pEnd, bounds, item;
      for (let k in this.layerDict) {
        item = this.layerDict[k];
        pStart = new BMapGL.Point(
          73.2763 + item.offset.x1,
          53.8584 + item.offset.y1
        );
        pEnd = new BMapGL.Point(
          135.518 + item.offset.x2,
          17.5358 + item.offset.y2
        );
        bounds = new BMapGL.Bounds(
          new BMapGL.Point(pStart.lng, pStart.lat),
          new BMapGL.Point(pEnd.lng, pEnd.lat)
        );

        this.layerDict[k].layer = new BMapGL.GroundOverlay(bounds, {
          type: "image",
          url: require("@/assets/images/map/" + k + ".png"),
          opacity: 1,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>