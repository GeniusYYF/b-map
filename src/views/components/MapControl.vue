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
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    init(map) {
      this.map = map;
      this.hideCopyright();
      //   this.addControl();
    },
    // 隐藏版权信息
    hideCopyright(map) {
      var mapEl = this.map.getContainer();
      var copyRightEL = mapEl.getElementsByClassName("anchorBL");
      copyRightEL[0].style.display = "none";
      copyRightEL[1].style.display = "none";
      console.log("已隐藏copyright");
    },
    // 添加控件
    addControl() {
      // 添加比例尺控件
      this.map.addControl(new BMapGL.ScaleControl());
      // 添加缩放控件
      this.map.addControl(new BMapGL.ZoomControl());
      // 添加城市列表控件
      // map.addControl(new BMapGL.CityListControl());
      // 定位
      this.map.addControl(new BMapGL.LocationControl());
      // 版权
      // console.log(this.map);
      // this.map.removeControl(new BMapGL.CopyrightControl());
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>