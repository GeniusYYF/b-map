<template>
  <div class="map-btns-box">
    <b-region v-if="active === 1" :BMap="BMap" @close="close"></b-region>
    <b-time v-if="active === 2" :BMap="BMap" @close="close"></b-time>
    <map-legend v-show="active === 3" :BMap="BMap" @close="close"></map-legend>
  </div>
</template>
<script>
import BRegion from "./BRegion.vue";
import BTime from "./BTime.vue";
import MapLegend from "./Legend.vue";

export default {
  name: "",
  components: { BRegion, BTime, MapLegend },
  props: ["active"],
  mixin: {},
  data: function () {
    return {
      BMap: null,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    init(BMap) {
      this.BMap = BMap;
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
// .map-btns-box {
//   position: absolute;
//   z-index: 2023;
//   left: 0;
//   top: 0;
// }
</style>