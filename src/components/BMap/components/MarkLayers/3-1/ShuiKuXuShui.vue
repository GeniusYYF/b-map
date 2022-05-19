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
        width: 16,
        height: 16,
        icon: require("@/assets/images/icons/shuiku.png"),
        enablePicked: true, // 是否可以拾取
        selectedColor: "#f3c56986", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = `
              <div class="row">
                <div class="label">站名：</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="row">
                <div class="label">站码：</div>
                <div class="value">${data.code}</div>
              </div>
              <div class="row">
                <div class="label">当前时间：</div>
                <div class="value">${data.time}</div>
              </div>
              <div class="row">
                <div class="label">当前水位(m)：</div>
                <div class="value">${data.shuiwei}</div>
              </div>
              <div class="row">
                <div class="label">当前蓄量(亿m³)：</div>
                <div class="value">${data.xuliang}</div>
              </div>
              <div class="row">
                <div class="label">上月同期(亿m³)：</div>
                <div class="value">${data.shangyue}</div>
              </div>
              <div class="row">
                <div class="label">去年同期(亿m³)：</div>
                <div class="value">${data.qunian}</div>
              </div>
              <div class="row">
                <div class="label">常年同期(亿m³)：</div>
                <div class="value">${data.changnian}</div>
              </div>
              <div class="row">
                <div class="label">死库容(亿m³)：</div>
                <div class="value">${data.si}</div>
              </div>
              <div class="row">
                <div class="label">总库容(亿m³)：</div>
                <div class="value">${data.zong}</div>
              </div>
              <div class="row">
                <div class="label">水库类型：</div>
                <div class="value">${data.type}</div>
              </div>
              <div class="row">
                <div class="label">距平：</div>
                <div class="value">${data.jp}</div>
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
            "水库蓄水",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var json = require("@/mock/3-1/shuikuxushui.json");
      // var ZDJson = require("@/mock/3-1/cezhan.json");
      // var dict = {};
      // for (let item of ZDJson) {
      //   dict[item.code] = { lng: item.lng, lat: item.lat };
      // }
      // var list = [];

      // for (let item of json) {
      //   item.lng = Number(dict[item.code]?.lng);
      //   item.lat = Number(dict[item.code]?.lat);
      //   list.push(item);
      // }
      // console.log(list);

      var data = [];
      for (let item of json) {
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