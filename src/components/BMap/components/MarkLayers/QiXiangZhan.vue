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
      layer: null,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init() {
      this.loadLayer();
    },
    loadLayer() {
      this.layer = new mapvgl.IconLayer({
        name: "QxzIconLayer",
        width: 8,
        height: 8,
        // offset: [0, -153 / 8],
        // opacity: 0.8,
        icon: require("@/assets/images/icons/qxz-icon.png"),
        // icon: "http://101.35.125.245/axure/zghq/icon/qxz-icon.png",
        enablePicked: true, // 是否可以拾取
        // selectedIndex: -1, // 选中项
        selectedColor: "#f3c56986", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = `
              <div class="row">
                <div class="label">名称：</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="row">
                <div class="label">类型：</div>
                <div class="value">${data.type}</div>
              </div>
              <div class="row">
                <div class="label">经度：</div>
                <div class="value">${data.lng}</div>
              </div>
              <div class="row">
                <div class="label">纬度：</div>
                <div class="value">${data.lat}</div>
              </div>
          `;
          this.$emit(
            "openWindow",
            "气象站点",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
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
      this.layer.setData(data);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>