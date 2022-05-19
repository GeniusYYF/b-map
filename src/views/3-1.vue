<template>
  <div class="s3">
    <aside-menu
      :list="list"
      :defaultActive="menuActive"
      @select="select"
    ></aside-menu>
    <b-map
      ref="BMap"
      :mapTitle="mapTitle"
      :mapDate="mapDate"
      @loaded="loaded"
    ></b-map>
    <div class="tools">
      <img src="@/assets/images/statistic/1-1-tools.png" />
      <div class="click click-1" @click="imgClick(1)"></div>
      <div class="click click-2" @click="imgClick(2)"></div>
      <div class="click click-3" @click="imgClick(3)"></div>
      <map-btns-box ref="mapBtnsBox" :active="active" @close="close">
      </map-btns-box>
    </div>

    <img
      v-show="['0-0', '0-2', '0-5'].includes(menuActive)"
      class="img-31-legend"
      src="@/assets/images/statistic/3-1-1-legend.png"
    />
    <img
      v-show="['1-0'].includes(menuActive)"
      class="img-31-legend"
      src="@/assets/images/statistic/3-1-1-legend2.png"
    />
    <img
      v-show="['1-1'].includes(menuActive)"
      class="img-31-legend"
      src="@/assets/images/statistic/3-1-1-legend3.png"
    />
    <!-- <img
      v-show="['2-0'].includes(menuActive)"
      class="img-31-legend"
      src="@/assets/images/statistic/3-1-1-legend4.png"
    /> -->
    <img
      v-show="['0-0'].includes(menuActive)"
      class="img-31-right"
      src="@/assets/images/statistic/3-1-1-right1.png"
    />
    <img
      v-show="['0-2', '0-5'].includes(menuActive)"
      class="img-31-right"
      src="@/assets/images/statistic/3-1-1-right.png"
    />
    <img
      v-show="['1-0', '1-1'].includes(menuActive)"
      class="img-31-right"
      src="@/assets/images/statistic/3-1-1-right2.png"
    />
  </div>
</template>
<script>
import BMap from "@/components/BMap";
import AsideMenu from "@/components/AsideMenu";
import MapBtnsBox from "./components/1-1/MapBtnsBox";

export default {
  name: "",
  components: { BMap, AsideMenu, MapBtnsBox },
  props: {},
  mixin: {},
  data: function () {
    return {
      active: "",
      menuActive: "0-0",
      mapTitle: {
        name: "全国旱情综合监测",
        point: [98.8, 54],
      },
      mapDate: {},

      list: [
        {
          title: "气象干旱监测产品",
          icon: "icon-qixiangganhanjiancechanpin",
          children: [
            { title: "降水距平指数", icon: "", children: [] },
            { title: "连续无雨日数", icon: "", children: [] },
            { title: "标准化降水指数", icon: "", children: [] },
            { title: "相对湿润度指数", icon: "", children: [] },
            { title: "标准化降水蒸散指数", icon: "", children: [] },
            { title: "气象干旱综合指数", icon: "", children: [] },
          ],
        },
        {
          title: "水文干旱监测产品",
          icon: "icon-shuiwenganhanjiancechanpin",
          children: [
            { title: "水文气象产品", icon: "", children: [] },
            { title: "江河来水量产品", icon: "", children: [] },
            { title: "水库蓄水量产品", icon: "", children: [] },
            { title: "土壤墒情分布产品", icon: "", children: [] },
            { title: "灌区供水量分析产品", icon: "", children: [] },
          ],
        },
        {
          title: "遥感",
          icon: "icon-yaogan",
          children: [
            { title: "TCI", icon: "", children: [] },
            { title: "VCI", icon: "", children: [] },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(() => {
      this.mapTitle = {
        name: "全国降水距平指数图",
        point: [97, 54],
      };
      this.mapDate = {
        point: [96.5, 52.5],
      };
    });
  },
  methods: {
    loaded(BMap) {
      this.$refs.mapBtnsBox.init(BMap);
      // let hupolLayer = this.$refs.BMap.$refs.hupo?.layer;
      // this.$refs.BMap.view.removeLayer(hupolLayer);
      this.$refs.BMap.loadHq();
      // this.$refs.BMap.showImageLayerForKeyOnly("jsjpzs");
      // setTimeout(() => {
      //   this.$refs.BMap.hideImageLayerForKey("base");
      // }, 2000);
    },
    close() {
      this.active = "";
    },
    imgClick(i) {
      if (this.active === i) {
        this.active = "";
      } else {
        this.active = i;
      }
    },
    select(val) {
      console.log(val);
      this.menuActive = val;
      this.$refs.BMap.loadHq();
      this.$refs.BMap.hideXYZLayer("JYZS1");
      this.$refs.BMap.hideXYZLayer("QiXiangGanHan");

      let jianghelaishui1 = this.$refs.BMap.$refs.jianghelaishui?.layer1;
      let jianghelaishui2 = this.$refs.BMap.$refs.jianghelaishui?.layer2;
      let shuikuxushui = this.$refs.BMap.$refs.shuikuxushui?.layer;
      let turangshangqing = this.$refs.BMap.$refs.turangshangqing?.layer;
      this.$refs.BMap.view.removeLayer(jianghelaishui1);
      this.$refs.BMap.view.removeLayer(jianghelaishui2);
      this.$refs.BMap.view.removeLayer(shuikuxushui);
      this.$refs.BMap.view.removeLayer(turangshangqing);

      // qxghzhzs jsjpzs bzhjszs swqxcp jhlslcp
      switch (val) {
        case "0-0":
          // this.$refs.BMap.showImageLayerForKeyOnly("jsjpzs");
          this.mapTitle = {
            name: "全国降水距平指数图",
            point: [97, 54],
          };
          this.mapDate = {
            point: [96.5, 52.5],
          };
          break;
        case "0-2":
          this.$refs.BMap.hideHq();
          this.$refs.BMap.topXZYLayer("JYZS1");
          // this.$refs.BMap.showImageLayerForKeyOnly("bzhjszs");
          this.mapTitle = {
            name: "全国标准降水(30天)指数图",
            point: [91.5, 54],
          };
          this.mapDate = {
            point: [96.5, 52.5],
          };
          break;
        case "0-5":
          this.$refs.BMap.hideHq();
          this.$refs.BMap.topXZYLayer("QiXiangGanHan");
          this.mapTitle = {
            name: "全国气象干旱月度综合指数图",
            point: [91, 54],
          };
          this.mapDate = {
            point: [96.5, 52.5],
          };
          break;
        case "1-0":
          this.mapTitle = {
            name: "水文气象产品",
            point: [100.3, 54],
          };
          this.mapDate = {
            point: [100, 52.5],
          };
          break;
        case "1-1":
          this.$refs.BMap.view.addLayer(jianghelaishui1);
          this.$refs.BMap.view.addLayer(jianghelaishui2);
          this.mapTitle = {
            name: "江河来水量产品",
            point: [99.8, 54],
          };
          this.mapDate = {
            point: [100.3, 52.5],
          };
          break;
        case "1-2":
          this.$refs.BMap.view.addLayer(shuikuxushui);
          this.mapTitle = {
            name: "水库蓄水量产品",
            point: [99.8, 54],
          };
          this.mapDate = {
            point: [100.3, 52.5],
          };
          break;
        case "1-3":
          this.$refs.BMap.view.addLayer(turangshangqing);
          this.mapTitle = {
            name: "土壤墒情分布产品",
            point: [99.8, 54],
          };
          this.mapDate = {
            point: [100.3, 52.5],
          };
          break;
        case "2-0":
          this.$refs.BMap.hideHq();
          this.$refs.BMap.topXZYLayer("YaoGanTCI");
          this.mapTitle = {
            name: "TCI",
            point: [100.3, 54],
          };
          this.mapDate = {
            point: [100.3, 52.5],
          };
          break;
        case "2-1":
          this.$refs.BMap.hideHq();
          this.$refs.BMap.topXZYLayer("YaoGanVCI");
          this.mapTitle = {
            name: "VCI",
            point: [100.3, 54],
          };
          this.mapDate = {
            point: [100.3, 52.5],
          };
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.s3 {
  position: relative;
  height: 100%;
  width: 100%;
}

.tools {
  position: absolute;
  z-index: 2023;
  top: 112px;
  right: 22px;
  .click {
    position: absolute;
    z-index: 2023;
    width: 67px;
    height: 24px;
    top: 8px;
    cursor: pointer;
  }
  .click-1 {
    left: 38px;
  }
  .click-2 {
    left: 188px;
  }
  .click-3 {
    left: 335px;
  }
}
.img-31-legend {
  position: absolute;
  z-index: 2022;
  left: 20px;
  bottom: 55px;
}
.img-31-right {
  position: absolute;
  z-index: 2022;
  bottom: 20px;
  right: 20px;
}
</style>