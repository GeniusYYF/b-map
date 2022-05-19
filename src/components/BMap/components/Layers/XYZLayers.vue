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
      loadXYZList: [],

      layerDict: {
        BaseMap: null,

        LinDiXDM: null,
        MuCaoXDM: null,
        GengDiXDM: null,
        HuPoXDM: null,

        LinMu: null,
        MuCao: null,
        NongZuoWu: null,

        ShuiDao: null,
        XiaoMai: null,
        YuMi: null,

        YaoGanTCI: null,
        YaoGanVCI: null,

        QiXiangGanHan: null,
        JYZS1: null,
        JYZS2: null,
        JYZS3: null,
        JYZS4: null,
        JYZS5: null,
        JYZS6: null,
        JYZS7: null,
        JYZS8: null,
        JYZS9: null,
        // YaoGanVSWI: null,
      },
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    init(map, loadXYZList = []) {
      this.loadXYZList = loadXYZList;
      console.log(loadXYZList);
      // 定义XYZLayer图层
      for (let k in this.layerDict) {
        this.layerDict[k] = new BMapGL.XYZLayer({
          // useThumbData: true,
          tileUrlTemplate:
            "https://localhost:6443/arcgis/rest/services/qghq/" +
            k +
            "/MapServer/export?" +
            "bbox=[b]&transparent=true&f=image",
          // "&dpi=96&size=1908%2C882&format=png8",
        });
        if (loadXYZList.includes(k)) {
          this.layerDict[k].setZIndex(-1);
          map.addTileLayer(this.layerDict[k]);
        }
      }
    },
    show(map, k, top) {
      if (k) {
        if (this.loadXYZList.length > 0) {
          this.layerDict[k].setZIndex(99);
        } else {
          top ? map.removeTileLayer(this.layerDict[k]) : "";
          map.addTileLayer(this.layerDict[k]);
        }
      }
    },
    hide(map, k) {
      if (k) {
        if (this.loadXYZList.length > 0) {
          this.layerDict[k].setZIndex(-1);
        } else {
          map.removeTileLayer(this.layerDict[k]);
        }
      }
    },
    topXZYLayer(map, k) {
      if (this.loadXYZList.length > 0) {
        for (let item of this.loadXYZList) {
          // this.layerDict[item].setZIndex(-1);
          map.removeTileLayer(this.layerDict[item]);
        }
      } else {
        for (let kk in this.layerDict) {
          // this.layerDict[item].setZIndex(-1);
          if (kk !== "BaseMap") map.removeTileLayer(this.layerDict[kk]);
        }
      }
      map.addTileLayer(this.layerDict[k]);
      // this.layerDict[k].setZIndex(99);
    },
    loadHq(map) {
      ["LinMu", "MuCao", "NongZuoWu"].forEach((k) => {
        map.addTileLayer(this.layerDict[k]);
      });
    },
    hideHq(map) {
      ["LinMu", "MuCao", "NongZuoWu"].forEach((k) => {
        map.removeTileLayer(this.layerDict[k]);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>