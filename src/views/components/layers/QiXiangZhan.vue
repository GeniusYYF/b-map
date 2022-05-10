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
      layer: null,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(map, view) {
      this.map = map;
      this.view = view;
      this.loadLayer();
    },
    loadLayer() {
      this.layer = new mapvgl.IconLayer({
        name: "QxzIconLayer",
        width: 8,
        height: 8,
        // offset: [0, -153 / 8],
        // opacity: 0.8,
        icon: require("@/assets/qxz-icon.png"),
        // icon: "http://101.35.125.245/axure/zghq/icon/qxz-icon.png",
        enablePicked: true, // 是否可以拾取
        // selectedIndex: -1, // 选中项
        selectedColor: "#ff0000", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          // 点击事件
          console.log("click", e);
        },
        onDblClick: (e) => {
          console.log("double click", e);
        },
        onRightClick: (e) => {
          console.log("right click", e);
        },
      });
      var data = [];
      var qxzJson = require("@/mock/qxz.json");
      for (let item of qxzJson) {
        data.push({
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat],
          },
          properties: item,
        });
      }

      this.view.addLayer(this.layer);
      this.layer.setData(data);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>