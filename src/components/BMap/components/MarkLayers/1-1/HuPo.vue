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
      layer2: null,
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
      let redList = [];
      this.layer = new mapvgl.IconLayer({
        // width: 16,
        // height: 16,
        icon: require("@/assets/images/icons/hupo.png"),
        enablePicked: true, // 是否可以拾取
        selectedColor: "#f3c56986", // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = `
              <div class="row">
                <div class="label">湖名：</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="row">
                <div class="label">所在省区：</div>
                <div class="value">${data.province}</div>
              </div>
              <div class="row">
                <div class="label">面积（平方公里）：</div>
                <div class="value">${data.area}</div>
              </div>
              <div class="row">
                <div class="label">干旱等级：</div>
                <div class="value yellow">${data.level}</div>
              </div>
              <div class="row">
                <div class="label">湖面高程（米）：</div>
                <div class="value">${data.high}</div>
              </div>
              <div class="row">
                <div class="label">最大水深（米）：</div>
                <div class="value">${data.deep}</div>
              </div>
              <div class="row">
                <div class="label">容积（亿立方米）：</div>
                <div class="value">${data.vol}</div>
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
            "重点湖泊",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var data = [];
      var json = require("@/mock/1-1/hupo.json");
      for (let item of json) {
        item.level = "无旱";
        if (["巢湖", "岱海"].includes(item.name)) {
          item.level = "轻度干旱";
          redList.push(item);
        }

        data.push({
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat],
          },
          properties: item,
        });
      }
      this.layer.setData(data);

      this.layer2 = new mapvgl.IconLayer({
        // width: 8,
        // height: 8,
        icon: require("@/assets/images/icons/hupo-yellow.png"),
        // enablePicked: true, // 是否可以拾取
        // selectedColor: "#f3c56986", // 选中项颜色
        // autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => {
          console.log(e);
          let coordinates = e.dataItem.geometry.coordinates;
          let data = e.dataItem.properties;
          let html = `
              <div class="row">
                <div class="label">湖名：</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="row">
                <div class="label">所在省区：</div>
                <div class="value">${data.province}</div>
              </div>
              <div class="row">
                <div class="label">面积（平方公里）：</div>
                <div class="value">${data.area}</div>
              </div>
              <div class="row">
                <div class="label">干旱等级：</div>
                <div class="value yellow">${data.level}</div>
              </div>
              <div class="row">
                <div class="label">湖面高程（米）：</div>
                <div class="value">${data.high}</div>
              </div>
              <div class="row">
                <div class="label">最大水深（米）：</div>
                <div class="value">${data.deep}</div>
              </div>
              <div class="row">
                <div class="label">容积（亿立方米）：</div>
                <div class="value">${data.vol}</div>
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
            "重点湖泊",
            html,
            new BMapGL.Point(coordinates[0], coordinates[1])
          );
        },
      });
      var data2 = [];
      for (let item of redList) {
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
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>