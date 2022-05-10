<template>
  <div class="map-btns">
    <div
      class="img"
      :class="{ active: legendActive }"
      @click="legendClick"
    ></div>
    <div class="img" :class="{ active: fullActive }" @click="fullClick"></div>
    <div
      class="img"
      :class="{ active: fullMapActive }"
      @click="fullMapClick"
    ></div>
    <div class="img" :class="{ active: dragActive }" @click="dragClick"></div>

    <!-- town -->
    <v-region
      ref="region"
      class="region"
      type="group"
      :search="true"
      @values="regionChange"
    ></v-region>

    <div class="date">
      <el-date-picker
        v-show="dateType === 'date'"
        v-model="date"
        type="date"
        :editable="false"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-date-picker
        v-show="dateType === 'daterange'"
        v-model="dateRange"
        type="daterange"
        :editable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        class="expand"
        :icon="
          dateType === 'date' ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
        "
        @click="dateTypeChange"
      >
      </el-button>
    </div>

    <el-select
      v-show="false"
      class="crop-type"
      v-model="cropType"
      multiple
      collapse-tags
      placeholder="作物类型"
    >
      <el-option
        v-for="item in cropTypeOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-show="false"
      class="crop-period"
      v-model="cropPeriod"
      multiple
      collapse-tags
      placeholder="作物生育期"
    >
      <el-option
        v-for="item in cropPeriodOptions"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <div class="lng-lat">
      <span>经度：{{ lng }}</span>
      <span style="margin-left: 8px">纬度：{{ lat }}</span>
    </div>

    <!-- <div class="legend">
      <div class="header">图层控制</div>
      <div class="body">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            class="row"
            v-for="(item, i) in legends"
            :key="i"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div> -->
    <div
      v-show="legendActive"
      class="legend-img"
      @click="qxzChangeVisible"
    ></div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  mixin: {},
  data: function () {
    return {
      lat: "",
      lng: "",

      region: {},
      date: "",
      dateRange: "",
      dateType: "date",
      cropType: "",
      cropTypeOptions: [],
      cropPeriod: "",
      cropPeriodOptions: [],
      legends: [],
      checkList: [],

      legendActive: false,
      fullActive: false,
      fullMapActive: true,
      dragActive: false,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.loadData();
    // this.$refs.region.$el.querySelector(
    //   ".v-region .rg-default-btn span:first-child"
    // ).innerText = "请选择行政区划";
  },
  methods: {
    loadData() {
      this.cropTypeOptions = ["冬小麦", "夏玉米", "水稻"];
      this.cropPeriodOptions = ["拔苗期", "抽水期"];
      this.legends = [
        "气象站点",
        "水文站点",
        "墒情站点",
        "灌区",
        "耕地",
        "林地",
        "草地",
        "重点湖泊湿地",
      ];
    },
    regionChange(val) {
      this.region = val;
      let value, level;
      if (val.town?.value) {
        value = val.town.value;
        level = 4;
      } else if (val.area?.value) {
        value = val.area.value;
        level = 3;
      } else if (val.city?.value) {
        value = val.city.value;
        level = 2;
      } else if (val.province?.value) {
        value = val.province.value;
        level = 1;
      }
      this.$emit("loadCity", value, level);
    },
    dateTypeChange() {
      this.dateType = this.dateType === "date" ? "daterange" : "date";
    },
    legendClick() {
      this.legendActive = !this.legendActive;
    },
    fullClick() {
      this.fullActive = !this.fullActive;
    },
    fullMapClick() {
      this.fullMapActive = !this.fullMapActive;
      this.$emit("changeMapToEarch", this.fullMapActive);
    },
    dragClick() {
      this.dragActive = !this.dragActive;
    },
    qxzChangeVisible() {
      this.$emit("qxzChangeVisible");
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
$defaultColor: #b9dbf6;
$activeColor: #ffd33a;
$lightColor: #3bb8ff;
$deepColor: #1a64c0;
$borderColor: #3bb8ff;
$border2Color: rgba(59, 183, 255, 0.5);

@mixin box($activeColor: $defaultColor) {
  box-shadow: inset 0 0 8px #1a3bff !important;
  border: 1px solid $borderColor !important;
  background-color: #343c5c !important;
  color: $activeColor !important;
}

.map-btns {
  .img,
  .region,
  .date,
  .crop-type,
  .crop-period,
  .lng-lat,
  .legend,
  .legend-img {
    position: absolute;
    z-index: 2022;
  }

  .img {
    width: 30px;
    height: 30px;
  }

  .img:nth-of-type(1) {
    cursor: pointer;
    left: 1438px;
    top: 126px;
    background: url("~@/assets/legend.png") no-repeat;
    background-size: 100% 100%;

    &.active,
    &:hover {
      background: url("~@/assets/legend-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .img:nth-of-type(2) {
    cursor: pointer;
    left: 1438px;
    top: 164px;
    background: url("~@/assets/full.png") no-repeat;
    background-size: 100% 100%;

    &.active,
    &:hover {
      background: url("~@/assets/full-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .img:nth-of-type(3) {
    cursor: pointer;
    left: 1438px;
    top: 202px;
    background: url("~@/assets/full-map.png") no-repeat;
    background-size: 100% 100%;

    &.active,
    &:hover {
      background: url("~@/assets/full-map-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .img:nth-of-type(4) {
    cursor: pointer;
    left: 1438px;
    top: 240px;
    background: url("~@/assets/drag.png") no-repeat;
    background-size: 100% 100%;

    &.active,
    &:hover {
      background: url("~@/assets/drag-active.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .region {
    left: 348px;
    top: 126px;
    ::v-deep .rg-default-btn {
      width: 200px;
    }
  }

  .date {
    left: 564px;
    top: 126px;
    .expand {
      //   border-radius: 0;
      padding: 10px 8px;
    }
  }

  .crop-type {
    left: 485px;
    top: 166px;
  }
  .crop-period {
    left: 721px;
    top: 166px;
  }

  .lng-lat {
    left: 348px;
    bottom: 26px;
    color: #c1dee9;
  }
  .legend {
    @include box($activeColor);
    left: 1298px;
    bottom: 26px;
    width: 170px;
    text-align: left;

    .header {
      border: 1px solid #1a8eff;
      padding: 8px;
      font-size: 14px;
    }
    .body {
      padding: 8px 16px;
      .row {
        width: 100%;
        margin-right: 0 !important;
        padding: 2px 0;
        margin: 2px 0;
        ::v-deep .el-checkbox__label {
          font-size: 13px;
        }
      }
    }
  }

  .legend-img {
    left: 1218px;
    top: 126px;
    width: 210px;
    height: 520px;
    background: url("~@/assets/legendLayer.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>