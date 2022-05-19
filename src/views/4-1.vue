<template>
  <div class="s4">
    <b-map @loaded="loaded"></b-map>
    <img class="img1" src="@/assets/images/statistic/4-1.png" />
    <img
      v-show="dialogVisible"
      class="img2"
      src="@/assets/images/statistic/4-1-2.png"
      @click="dialogVisible = false"
    />
  </div>
</template>
<script>
import BMap from "@/components/BMap";

export default {
  name: "",
  components: { BMap },
  props: {},
  mixin: {},
  data: function () {
    return {
      dialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    loaded(BMap) {
      let that = this;
      function cb(data) {
        console.log(data);
        that.dialogVisible = true;
      }

      setTimeout(() => {
        BMap.$refs.jiaohe.init(BMap.view, cb);
        // BMap.showImageLayerForKeyOnly("ld-hq");
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.s4 {
  position: relative;
  height: 100%;
  width: 100%;
}
.img1 {
  position: absolute;
  z-index: 2022;
  right: 22px;
  bottom: 20px;
}
.img2 {
  position: absolute;
  z-index: 2030;
  left: 500px;
  bottom: 100px;
}
</style>