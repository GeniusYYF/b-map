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
      layers: [],
      list: [
        {
          name: "广安",
          type: "一般站",
          lng: 122.06,
          lat: 49.39,
        },
        {
          name: "广安",
          type: "一般站",
          lng: 110.72,
          lat: 33.93,
        },
        {
          name: "广安",
          type: "一般站",
          lng: 119.06,
          lat: 33.33,
        },
        {
          name: "广安",
          type: "一般站",
          lng: 114.64,
          lat: 30.39,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(view, cb) {
      this.loadLayer(view, cb);
    },
    loadLayer(view, cb) {
      var i = 0;
      var names = ["2", "3", "5", "7"];

      for (let item of this.list) {
        this.layers[i] = new mapvgl.IconLayer({
          // width: 44,
          // height: 47,
          // offset: [0, -153 / 8],
          // opacity: 0.8,
          icon: require("@/assets/images/icons/jiaohe-" + names[i] + ".png"),
          enablePicked: true, // 是否可以拾取
          // selectedIndex: -1, // 选中项
          // selectedColor: "#F2C469", // 选中项颜色
          // autoSelect: true, // 根据鼠标位置来自动设置选中项
          onClick: (e) => {
            console.log(e);
            if (e.dataIndex !== -1) {
              cb(e.dataItem.properties);
            }
          },
        });
        this.layers[i].setData([
          {
            geometry: {
              type: "Point",
              coordinates: [item.lng, item.lat],
            },
            properties: item,
          },
        ]);
        view.addLayer(this.layers[i]);
        i++;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>