<template>
  <div class="s1">
    <aside-menu :list="list" defaultActive="0" @select="select"></aside-menu>
    <b-map ref="BMap" :mapTitle="mapTitle" @loaded="loaded"></b-map>
    <div class="tools">
      <img src="@/assets/images/statistic/1-1-tools.png" />
      <div class="click click-1" @click="imgClick(1)"></div>
      <div class="click click-2" @click="imgClick(2)"></div>
      <div class="click click-3" @click="imgClick(3)"></div>
      <map-btns-box ref="mapBtnsBox" :active="active" @close="close">
      </map-btns-box>
    </div>
    <img
      v-if="getActiveLevel === 0"
      class="right-img"
      src="@/assets/images/statistic/1-1.png"
    />
    <img
      v-else-if="getActiveLevel === 1"
      class="right-img"
      src="@/assets/images/statistic/1-1_2.png"
    />
    <img
      v-else-if="getActiveLevel === 2"
      class="right-img"
      src="@/assets/images/statistic/1-1_3.png"
    />
    <img
      v-else-if="getActiveLevel === 3"
      class="right-img"
      src="@/assets/images/statistic/1-1_3.png"
    />

    <div class="img2">
      <img src="@/assets/images/statistic/1-1-legend2.png" />
      <div class="legend-list">
        <div
          class="row"
          v-for="(item, i) in legendList"
          :key="i"
          @click="legendClick(item)"
        >
          <span>
            <img
              class="icon"
              :src="require('@/assets/images/icons/' + item.icon + '.png')"
              alt=""
            />
            <span>{{ item.name }}</span>
          </span>
          <img
            v-show="item.value"
            src="@/assets/images/icons/check-btn-active.png"
            alt=""
          />
          <img
            v-show="!item.value"
            src="@/assets/images/icons/check-btn.png"
            alt=""
          />
        </div>

        <div class="check-list">
          <el-checkbox
            class="check-row all"
            v-model="checkValue.all"
            :disabled="activeMenu === '4'"
            @change="change"
            >全选</el-checkbox
          >
          <el-checkbox class="check-row" v-model="checkValue.value1" disabled
            >特大干旱</el-checkbox
          >
          <el-checkbox class="check-row" v-model="checkValue.value2" disabled
            >严重干旱</el-checkbox
          >
          <el-checkbox class="check-row" v-model="checkValue.value3" disabled
            >中度干旱</el-checkbox
          >
          <el-checkbox class="check-row" v-model="checkValue.value4" disabled
            >轻度干旱</el-checkbox
          >
        </div>
      </div>
    </div>

    <div v-show="active2" class="img3">
      <img class="img3-1" src="@/assets/images/statistic/1-1-2.png" />
      <div class="nzw-list">
        <div
          class="row"
          v-for="(item, i) in nzwList"
          :key="i"
          @click="nzwClick(item)"
        >
          <span class="label">{{ item.name }}</span>
          <img
            v-if="item.value"
            src="@/assets/images/icons/check-btn-active.png"
            alt=""
          />
          <img v-else src="@/assets/images/icons/check-btn.png" alt="" />
        </div>
      </div>
    </div>
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
      active1: true,
      active2: false,
      mapTitle: {
        name: "全国旱情综合监测",
        point: [98.8, 54],
      },
      checkValue: {
        all: true,
        value1: true,
        value2: true,
        value3: true,
        value4: true,
      },
      activeMenu: 0,
      markInterval: null, // mark闪烁定时器
      hqDict: {
        0: "",
        1: "NongZuoWu",
        2: "LinMu",
        3: "MuCao",
        // 4: "ZhongDianHuPo",
      },
      nzwList: [
        { name: "晚稻", value: "" },
        { name: "一季稻", value: "", k: "ShuiDao" },
        { name: "冬小麦", value: "", k: "XiaoMai" },
        { name: "春玉米", value: "", k: "YuMi" },
        { name: "夏玉米", value: "" },
      ],
      legendList: [
        { name: "雨量站", icon: "雨量站", value: "" },
        { name: "水库站", icon: "水库站", value: "" },
        { name: "墒情站", icon: "墒情站", value: "" },
        { name: "水文站", icon: "水文站", value: "" },
        { name: "作物农时", icon: "作物农时", value: "" },
        { name: "耕地", icon: "耕地", value: "", k: "GengDiXDM" },
        { name: "林地", icon: "林地", value: "", k: "LinDiXDM" },
        { name: "草地", icon: "草地", value: "", k: "MuCaoXDM" },
      ],
      list: [
        { title: "综合一张图", icon: "icon-zongheyizhangtu", children: [] },
        {
          title: "农作物旱情监测",
          icon: "icon-nongzuowuhanqingjiance",
          children: [],
          // children: [
          //   { title: "农业一张图", icon: "", children: [] },
          //   {
          //     title: "雨养作物旱情监测",
          //     icon: "",
          //     children: [
          //       { title: "旱地作物旱情监测", icon: "", children: [] },
          //       { title: "水田作物旱情监测", icon: "", children: [] },
          //     ],
          //   },
          //   {
          //     title: "灌溉作物旱情监测",
          //     icon: "",
          //     children: [
          //       { title: "灌溉需水量", icon: "", children: [] },
          //       { title: "灌溉作物旱情监测", icon: "", children: [] },
          //     ],
          //   },
          // ],
        },
        {
          title: "林木旱情监测",
          icon: "icon-linmuhanqingjiance",
          children: [],
        },
        {
          title: "牧草旱情监测",
          icon: "icon-mucaohanqingjiance",
          children: [],
        },
        {
          title: "重点湖泊湿地生态旱情监测",
          icon: "icon-zhongdianhuboshidishengtaihanqingjiance",
          children: [],
        },
      ],
    };
  },
  computed: {
    getActiveLevel() {
      return this.$store.getters.getActiveLevel;
    },
  },
  watch: {
    "$store.getters.getLegendStatus"(val) {
      for (let k in val) {
        for (let item of this.legendList) {
          if (item.k === k) {
            item.value = val[k];
          }
        }
        for (let item of this.nzwList) {
          if (item.k === k) {
            item.value = val[k];
          }
        }
      }
    },
  },
  created: function () {},
  mounted: function () {
    this.$nextTick(() => {
      setTimeout(() => {
        for (let k in this.hqDict) {
          this.$refs.BMap.changeXZYLayer(this.hqDict[k], true);
        }
      }, 2000);
    });
  },
  methods: {
    loaded(BMap) {
      this.$refs.mapBtnsBox.init(BMap);
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
    legendClick(item) {
      item.value = !item.value;
      switch (item.name) {
        case "雨量站":
          let layer = this.$refs.BMap.$refs.qxz?.layer;
          item.value
            ? this.$refs.BMap.view.addLayer(layer)
            : this.$refs.BMap.view.removeLayer(layer);
          break;
        case "作物农时":
          this.active2 = item.value;
          break;
        case "林地":
          this.$refs.BMap.changeXZYLayer("LinDiXDM", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "LinDiXDM",
            v: item.value,
          });
          break;
        case "草地":
          this.$refs.BMap.changeXZYLayer("MuCaoXDM", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "MuCaoXDM",
            v: item.value,
          });
          break;
        case "耕地":
          this.$refs.BMap.changeXZYLayer("GengDiXDM", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "GengDiXDM",
            v: item.value,
          });
          break;
        default:
          break;
      }
    },
    select(val) {
      console.log(val);
      this.active1 = false;
      this.active2 = false;
      this.activeMenu = val;

      this.checkValue.all = true;
      this.checkValue.value1 = true;
      this.checkValue.value2 = true;
      this.checkValue.value3 = true;
      this.checkValue.value4 = true;

      for (let item of this.legendList) {
        item.value = false;
      }

      let hupolLayer = this.$refs.BMap.$refs.hupo?.layer;
      let hupolLayer2 = this.$refs.BMap.$refs.hupo?.layer2;
      this.$refs.BMap.view.removeLayer(hupolLayer);
      this.$refs.BMap.view.removeLayer(hupolLayer2);
      this.$refs.BMap.changeXZYLayer("LinDiXDM", false);
      this.$refs.BMap.changeXZYLayer("MuCaoXDM", false);
      this.$refs.BMap.changeXZYLayer("GengDiXDM", false);
      this.$refs.BMap.changeXZYLayer("HuPoXDM", false);
      clearInterval(this.markInterval);
      for (let k in this.hqDict) {
        this.$refs.BMap.changeXZYLayer(this.hqDict[k], false);
      }

      // this.$refs.BMap.showImageLayerForKeyOnly(this.hqDict[this.activeMenu]);
      switch (val) {
        case "0":
          this.active1 = true;
          for (let k in this.hqDict) {
            this.$refs.BMap.changeXZYLayer(this.hqDict[k], true);
          }
          this.mapTitle = {
            name: "全国旱情综合监测",
            point: [98.8, 54],
          };
          break;
        case "1":
        case "1-0":
          // this.active2 = true;
          this.$refs.BMap.changeXZYLayer("NongZuoWu", true);
          this.mapTitle = {
            name: " 农作物旱情监测 ",
            point: [99.8, 54],
          };
        case "1-1-0":
        case "1-1-1":
        case "1-2-0":
        case "1-2-1":
          break;
        case "2":
          this.$refs.BMap.changeXZYLayer("LinMu", true);
          this.mapTitle = {
            name: "  林木旱情监测  ",
            point: [100.8, 54],
          };
          break;
        case "3":
          this.$refs.BMap.changeXZYLayer("MuCao", true);
          this.mapTitle = {
            name: "  牧草旱情监测  ",
            point: [100.8, 54],
          };
          break;
        case "4":
          this.$refs.BMap.view.addLayer(hupolLayer);
          this.$refs.BMap.changeXZYLayer("HuPoXDM", true);
          let i = 0;
          this.markInterval = setInterval(() => {
            if (i % 2 === 0) {
              this.$refs.BMap.view.addLayer(hupolLayer2);
            } else {
              this.$refs.BMap.view.removeLayer(hupolLayer2);
            }
            i++;
          }, 300);
          this.mapTitle = {
            name: "重点湖泊湿地生态旱情监测",
            point: [96, 54],
          };
          break;
        default:
          break;
      }
    },
    change(val) {
      this.checkValue.value1 = val;
      this.checkValue.value2 = val;
      this.checkValue.value3 = val;
      this.checkValue.value4 = val;
      if (val) {
        if (this.hqDict[this.activeMenu]) {
          this.$refs.BMap.changeXZYLayer(this.hqDict[this.activeMenu], true);
        } else {
          for (let k in this.hqDict) {
            this.$refs.BMap.changeXZYLayer(this.hqDict[k], true);
          }
        }
      } else {
        for (let k in this.hqDict) {
          this.$refs.BMap.changeXZYLayer(this.hqDict[k], false);
        }
      }
    },
    nzwClick(item) {
      item.value = !item.value;
      switch (item.name) {
        case "一季稻":
          this.$refs.BMap.changeXZYLayer("ShuiDao", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "ShuiDao",
            v: item.value,
          });
          break;
        case "冬小麦":
          this.$refs.BMap.changeXZYLayer("XiaoMai", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "XiaoMai",
            v: item.value,
          });
          break;
        case "春玉米":
          this.$refs.BMap.changeXZYLayer("YuMi", item.value);
          this.$store.commit("setLegendStatusProp", {
            k: "YuMi",
            v: item.value,
          });
          break;
        default:
          break;
      }
    },
  },
  destroyed() {
    clearInterval(this.markInterval);
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.s1 {
  position: relative;
  height: 100%;
  width: 100%;
}
.right-img {
  position: absolute;
  z-index: 202;
  right: 22px;
  bottom: 20px;
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
.img2 {
  position: absolute;
  z-index: 2022;
  left: 20px;
  bottom: 55px;
  .legend-list {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    color: #b9dbf6;
    font-size: 15px;
    box-sizing: border-box;
    padding: 0 10px;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50%;
      box-sizing: border-box;
      padding-top: 12px;
      padding-right: 3px;
      cursor: pointer;
      user-select: none;
      .icon {
        margin-right: 8px;
      }
    }
    .row:nth-child(2n) {
      padding-left: 15px;
    }

    .check-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding: 20px 0px;
      .check-row {
        display: flex;
        justify-content: space-between;
        width: 48%;
        margin-bottom: 10px;
        &.all {
          width: 100%;
          justify-content: flex-start;
        }
      }
      .el-checkbox {
        margin-right: 0;

        ::v-deep .el-checkbox__label {
          font-size: 15px;
          padding-left: 8px;

          &::before {
            content: "";
            display: inline-block;
            width: 26px;
            height: 12px;
            margin-right: 8px;
          }
        }
      }
      .el-checkbox:nth-of-type(1) ::v-deep .el-checkbox__label::before {
        display: none;
      }
      .el-checkbox:nth-of-type(2) ::v-deep .el-checkbox__label::before {
        background-color: rgb(173, 0, 0);
        border: 1px solid rgb(97, 1, 1);
      }
      .el-checkbox:nth-of-type(3) ::v-deep .el-checkbox__label::before {
        background-color: rgb(244, 11, 10);
        border: 1px solid rgb(132, 8, 8);
      }
      .el-checkbox:nth-of-type(4) ::v-deep .el-checkbox__label::before {
        background-color: rgb(255, 154, 0);
        border: 1px solid rgb(148, 89, 0);
      }
      .el-checkbox:nth-of-type(5) ::v-deep .el-checkbox__label::before {
        background-color: rgb(252, 254, 2);
        border: 1px solid #9a9a00;
      }
    }
  }
}
.img3 {
  position: absolute;
  z-index: 2022;
  left: 681px;
  bottom: -8px;
  .img3-1 {
    transform: scale(0.8);
  }
  .nzw-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 102px;
    top: 67px;
    color: #b9dbf6;
    font-size: 15px;
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding-top: 7px;
      cursor: pointer;
      user-select: none;
      img {
        margin-left: 4px;
      }
    }
  }
}
</style>