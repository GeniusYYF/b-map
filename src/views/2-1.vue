<template>
  <div class="s2">
    <div class="aside-menu-column">
      <div class="item" :class="{ active: active === 1 }" @click="click(1)">
        <div class="icon1"></div>
        <div class="label">对比</div>
      </div>
      <div class="item" :class="{ active: active === 2 }" @click="click(2)">
        <div class="icon2"></div>
        <div class="label">演变</div>
      </div>
    </div>

    <div v-if="active === 1" class="tab1">
      <div class="map-wrapper">
        <div class="wrapper1">
          <b-map
            id="map1"
            ref="BMap1"
            :notPlay="true"
            :hideTools="true"
            :mapTitle="mapTitle1"
            :mapDate="mapDate1"
          ></b-map>
        </div>
        <div class="wrapper2">
          <b-map
            id="map2"
            ref="BMap2"
            :notPlay="true"
            :notBase="true"
            :hideTools="true"
            :mapTitle="mapTitle2"
            :mapDate="mapDate2"
            @loaded="loaded"
          ></b-map>
        </div>
        <img class="img" src="@/assets/images/icons/duibi-center.png" alt="" />
      </div>

      <img class="img1" src="@/assets/images/statistic/2-1.png" />
    </div>
    <div v-if="active === 2" class="tab2">
      <b-map
        id="map3"
        ref="BMap3"
        :hideTools="true"
        :mapTitle="mapTitle3"
        :mapDate="mapDate3"
        centerAndZoom="117,39,5.6"
        @loaded="loadedMap3"
      ></b-map>
      <div class="img2">
        <img src="@/assets/images/statistic/2-1-2.png" @click="play(true)" />
        <img
          v-show="start"
          class="finish"
          src="@/assets/images/statistic/2-1-finish.png"
          @click="play(false)"
        />
      </div>
      <div class="img3">
        <div class="date" :style="{ left: getDateLeft }">
          <img src="@/assets/images/statistic/2-1-date.png" />
          <span>2019-09-{{ date }}</span>
        </div>
        <img src="@/assets/images/statistic/2-1-3.png" />
      </div>
    </div>
  </div>
</template>
<script>
import BMap from "@/components/BMap";
import AsideMenu from "@/components/AsideMenu";

export default {
  name: "",
  components: { BMap, AsideMenu },
  props: {},
  mixin: {},
  data: function () {
    return {
      active: 1,
      mapThis: null,
      start: false,
      month: 0,
      dateLeft: 0,
      count: 0,
      date: 10,
      interval: null,
      hqDict: {
        0: "",
        1: "NongZuoWu",
        2: "LinMu",
        3: "MuCao",
        // 4: "ZhongDianHuPo",
      },
      loadXYZList: [
        "JYZS1",
        "JYZS2",
        "JYZS3",
        "JYZS4",
        "JYZS5",
        "JYZS6",
        "JYZS7",
        "JYZS8",
        "JYZS9",
      ],

      mapTitle1: {},
      mapDate1: {},
      mapTitle2: {},
      mapDate2: {},
      mapTitle3: {},
      mapDate3: {},
    };
  },
  computed: {
    getDateLeft() {
      return 62 + this.count * 26 + "px";
    },
  },
  watch: {},
  created: function () {},
  mounted: function () {
    this.mapTitle1 = {
      name: "全国旱情综合监测",
      point: [96, 54],
    };
    this.mapDate1 = {
      point: [94.5, 52.5],
    };
    this.mapTitle2 = {
      name: "全国标准化降水指数监测图(SPI30)",
      point: [88.8, 54],
    };
    this.mapDate2 = {
      point: [94.5, 52.5],
    };
    this.mapTitle3 = {
      name: "综合旱情分布图",
      point: [99, 52.5],
    };
    this.mapDate3 = {
      point: [96.7, 51],
    };
  },
  methods: {
    click(i) {
      this.active = i;
      if (i === 2) {
        // setTimeout(() => {
        //   this.$refs.BMap3.showImageLayerForKeyOnly("base1");
        // }, 3000);
      }
    },
    loaded(that) {
      this.mapThis = that;
      setTimeout(() => {
        // this.mapThis.map.clearOverlays();
        // this.$refs.BMap1.showImageLayerForKeyOnly("base1");
      }, 1000);
      for (let k in this.hqDict) {
        this.$refs.BMap1.changeXZYLayer(this.hqDict[k], true);
      }
      this.$refs.BMap2.changeXZYLayer("JYZS1", true);
    },
    loadedMap3(that) {
      this.$refs.BMap3.changeXZYLayer("JYZS1", true);
    },
    play(flag) {
      this.start = flag;
      if (flag) {
        this.interval = setInterval(() => {
          if (flag && this.month === 8) {
            this.month = -1;
          }
          if (this.count === 20) {
            this.count = 0;
          }
          this.month++;
          this.count++;
          this.date = this.count + 10;
          this.$refs.BMap3.topXZYLayer("JYZS" + (this.month + 1));
        }, 3000);
      } else {
        clearInterval(this.interval);
      }
    },
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.s2,
.tab1,
.tab2 {
  position: relative;
  height: 100%;
  width: 100%;
}
.img1 {
  position: absolute;
  z-index: 2022;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 20px;
}
.img2 {
  position: absolute;
  z-index: 2022;
  right: 22px;
  bottom: 20px;
  cursor: pointer;
}
.img3 {
  position: absolute;
  z-index: 2022;
  left: 238px;
  bottom: 20px;
}
.finish {
  position: absolute;
  z-index: 2022;
  top: 69px;
  right: 18px;
  cursor: pointer;
}
.date {
  position: absolute;
  z-index: 2022;
  bottom: 20px;
  left: 62px;
  span {
    position: absolute;
    left: 8px;
    top: 4px;
    color: #3d2a04;
    font-size: 12px;
    font-family: "Digital";
    font-weight: 600;
    white-space: nowrap;
  }
}
.aside-menu-column {
  position: absolute;
  z-index: 2022;
  top: 112px;
  left: 30px;
  display: flex;
  flex-direction: column;
  .icon1 {
    display: inline-block;
    height: 22px;
    width: 23px;
    background: url("~@/assets/images/icons/duibi.svg") no-repeat;
    background-size: 100% 100%;
  }
  .icon2 {
    display: inline-block;
    height: 22.4px;
    width: 22.4px;
    background: url("~@/assets/images/icons/yanbian.svg") no-repeat;
    background-size: 100% 100%;
  }
  .item {
    padding: 5px 15px;
    margin-bottom: 25px;
    font-size: 14px;
    color: #b9dbf6;

    border: 1px solid #1a8eff;
    border-radius: 4px;
    background-color: rgba($color: #000a31, $alpha: 0.79);
    box-shadow: 0 0 46px 0 rgba(26, 60, 255, 0.43) inset;

    cursor: pointer;
  }
  .item.active {
    color: #f3c569;
    border-color: #f3c569;
    background-color: rgb(64, 73, 90);
    box-shadow: none;

    .icon1 {
      background: url("~@/assets/images/icons/duibi-active.svg") no-repeat;
      background-size: 100% 100%;
    }
    .icon2 {
      background: url("~@/assets/images/icons/yanbian-active.svg") no-repeat;
      background-size: 100% 100%;
    }
  }
}

.map-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .wrapper1 {
    width: 50%;
    height: 100%;
    border-right: 3px solid #6c92ff;
  }
  .wrapper2 {
    width: 50%;
    height: 100%;
    border-left: 3px solid #6c92ff;
  }
  .img {
    position: absolute;
    z-index: 2030;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>