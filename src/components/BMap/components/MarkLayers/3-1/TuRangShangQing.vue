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
        icon: require("@/assets/images/icons/trsq.png"),
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
                <div class="label">田间持水率(%)：</div>
                <div class="value">${data["rate-tianjian"]}</div>
              </div>
              <div class="row">
                <div class="label">平均含水率(%)：</div>
                <div class="value">${data["rate-pingjun"]}</div>
              </div>
              <div class="row">
                <div class="label">10CM含水率(%)：</div>
                <div class="value">${data["rate-shi"]}</div>
              </div>
              <div class="row">
                <div class="label">20CM含水率(%)：</div>
                <div class="value">${data["rate-ershi"]}</div>
              </div>
              <div class="row">
                <div class="label">40CM含水率(%)：</div>
                <div class="value">${data["rate-sishi"]}</div>
              </div>
              <div class="row">
                <div class="label">时间：</div>
                <div class="value">${data.time}</div>
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
          this.$emit(
            "openWindow",
            "土壤墒情",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var json = require("@/mock/3-1/turangshangqing.json");
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