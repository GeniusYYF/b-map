<template>
  <div></div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    title: {
      type: Object,
      default: () => {
        return {
          name: "全国旱情综合监测",
          point: [98.8, 54],
        };
      },
    },
    date: {
      type: Object,
      default: () => {
        return {
          name: ["2022年05月15日", ""],
          point: [94.5 + 3, 52.5],
        };
      },
    },
  },
  mixin: {},
  data: function () {
    return {
      map: null,
      titleLayer: null,
      dateLayer: null,
      // interval: null,
      labelStyle: {
        title: {
          color: "rgb(255,255,255)",
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: "Alibaba",
          textShadow: "0 0 4px #000000",

          backgroundColor: "#ffffff00",
          border: "none",
        },
        date: {
          color: "rgb(255,255,255)",
          fontSize: "24px",
          fontFamily: "Alibaba",
          textShadow: "0 0 4px #000000",

          backgroundColor: "#ffffff00",
          border: "none",
        },
      },
    };
  },
  computed: {},
  watch: {
    title() {
      console.log(this.title);
      this.titleLayer?.setContent(this.title.name);
      this.titleLayer?.setPosition(
        new BMapGL.Point(this.title.point[0], this.title.point[1])
      );
    },
    date() {
      this.date.name ? this.dateLayer?.setContent(this.date.name) : "";
      this.dateLayer?.setPosition(
        new BMapGL.Point(this.date.point[0], this.date.point[1])
      );
    },
  },
  created: function () {},
  mounted: function () {},
  methods: {
    init(map) {
      this.map = map;
      this.loadTime();
      this.loadMapTitle();
    },
    loadMapTitle() {
      this.titleLayer = new BMapGL.Label(this.title.name, {
        position: new BMapGL.Point(this.title.point[0], this.title.point[1]),
        enableMassClear: false,
      });
      this.titleLayer.setStyle(this.labelStyle.title);
      this.map.addOverlay(this.titleLayer);

      this.dateLayer = new BMapGL.Label("2019年09月21日" || this.date.name[0], {
        position: new BMapGL.Point(this.date.point[0] + 3, this.date.point[1]),
        enableMassClear: false,
      });
      this.dateLayer.setStyle(this.labelStyle.date);
      this.map.addOverlay(this.dateLayer);
    },
    loadTime() {
      this.date.name = this.dateFormat({
        ch: [
          ["年", "月", "日"],
          [":", ":", ""],
        ],
      });
      // this.interval = setInterval(() => {
      //   this.date.name = this.dateFormat({
      //     ch: [
      //       ["年", "月", "日"],
      //       [":", ":", ""],
      //     ],
      //   });
      //   this.dateLayer.setContent(this.date.name.join(" "));
      // }, 1000);
    },
    dateFormat(options) {
      const date = options?.date || new Date();
      const ch = options?.ch || "-";
      if (!(date instanceof Date)) return date;

      let formatNumber = (n) => {
        n = n.toString();
        return n[1] ? n : "0" + n;
      };
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
      if (Array.isArray(ch)) {
        return [
          [year, month, day]
            .map(formatNumber)
            .map((_, i) => _ + ch[0][i])
            .join(""),
          [hour, minute, second]
            .map(formatNumber)
            .map((_, i) => _ + ch[1][i])
            .join(""),
        ];
      }
      return [
        [year, month, day].map(formatNumber).join(ch),
        [hour, minute, second].map(formatNumber).join(":"),
      ];
    },
    setDate({ name, position }) {
      name
        ? this.dateLayer.setContent(
            this.dateFormat({
              ch: [
                ["年", "月", "日"],
                [":", ":", ""],
              ],
              date: name,
            })[0]
          )
        : "";
      position
        ? this.dateLayer.setPosition(new BMapGL.Point(position[0], position[1]))
        : "";
    },
  },
  // destroyed() {
  //   clearInterval(this.interval);
  // },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>