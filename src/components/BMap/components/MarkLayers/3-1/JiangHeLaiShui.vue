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
      layer1: null,
      layer2: null,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init() {
      // var json = require("@/mock/3-1/jianghelaishui.json");
      // var ZDJson = require("@/mock/3-1/cezhan.json");
      // var dict = {};
      // for (let item of ZDJson) {
      //   dict[item.code] = { lng: item.lng, lat: item.lat };
      // }
      // var more = [],
      //   lettle = [];

      // for (let item of json) {
      //   item.lng = Number(dict[item.code].lng);
      //   item.lat = Number(dict[item.code].lat);
      //   if (Number(item.jp) >= 0) {
      //     more.push(item);
      //   } else {
      //     lettle.push(item);
      //   }
      // }
      this.loadLayer();
    },
    loadLayer() {
      let more = require("@/mock/3-1/jianghelaishuiMore.json");
      this.layer1 = new mapvgl.IconLayer({
        width: 16,
        height: 16,
        icon: require("@/assets/images/icons/jhls-duo.png"),
        enablePicked: true, // 是否可以拾取
        selectedColor: "#f3c56986", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = this.getHtml(data);
          this.$emit(
            "openWindow",
            "江河来水",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var data = [];
      for (let item of more) {
        data.push({
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat],
          },
          properties: item,
        });
      }
      this.layer1.setData(data);

      let lettle = require("@/mock/3-1/jianghelaishuiLettle.json");
      this.layer2 = new mapvgl.IconLayer({
        width: 16,
        height: 16,
        icon: require("@/assets/images/icons/jhls-shao.png"),
        enablePicked: true, // 是否可以拾取
        selectedColor: "#f3c56986", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = this.getHtml(data);
          this.$emit(
            "openWindow",
            "江河来水",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var data2 = [];
      for (let item of lettle) {
        data2.push({
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat],
          },
          properties: item,
        });
      }
      this.layer2.setData(data2);
    },
    getHtml(data) {
      return `
              <div class="row">
                <div class="label">站名：</div>
                <div class="value">${data.stop}</div>
              </div>
              <div class="row">
                <div class="label">站码：</div>
                <div class="value">${data.code}</div>
              </div>
              <div class="row">
                <div class="label">平均流量：</div>
                <div class="value">${data.pingjun}</div>
              </div>
              <div class="row">
                <div class="label">常年均值：</div>
                <div class="value">${data.changnian}</div>
              </div>
              <div class="row">
                <div class="label">距平：</div>
                <div class="value">${data.jp}</div>
              </div>
              <div class="row">
                <div class="label">流量距平(%)：</div>
                <div class="value">${data["ls-zongliang"]}</div>
              </div>
              <div class="row">
                <div class="label">来水均值总量(亿)：</div>
                <div class="value">${data["ls-zongliang"]}</div>
              </div>
              <div class="row">
                <div class="label">站址：</div>
                <div class="value">${data.address}</div>
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
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>