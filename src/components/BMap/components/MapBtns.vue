<template>
  <div class="map-btns">
    <div class="imgs-wrapper">
      <div class="imgs">
        <div
          class="img"
          :class="{ active: active === 1 }"
          @click="imgClick(1)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 2 }"
          @click="imgClick(2)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 3 }"
          @click="imgClick(3)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 4 }"
          @click="imgClick(4)"
        ></div>
        <div
          class="img"
          :class="{ active: isActive5 }"
          @click="imgClick(5)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 6 }"
          @click="imgClick(6)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 7 }"
          @click="imgClick(7)"
        ></div>
        <div
          class="img"
          :class="{ active: active === 8 }"
          @click="imgClick(8)"
        ></div>
      </div>
    </div>

    <div class="lng-lat">
      <span>经度：{{ lng }}</span>
      <span style="margin-left: 8px">纬度：{{ lat }}</span>
    </div>
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
      BMap: null,
      lat: "",
      lng: "",
      active: "",
      isActive5: false,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {},
  methods: {
    init(BMap) {
      this.BMap = BMap;
      BMap.map.addEventListener("mousemove", (e) => {
        // this.lng = e.latlng.lng.toFixed(2);
        // this.lat = e.latlng.lat.toFixed(2);
        this.lng = e.latlng.lng;
        this.lat = e.latlng.lat;
      });
    },
    imgClick(i) {
      if (i === 5) {
        this.changeMapToEarch();
      } else {
        if (this.active === i) {
          this.active = "";
        } else {
          this.active = i;
        }
      }
    },
    close() {
      this.active = "";
    },
    changeMapToEarch(toEarch = true) {
      if (!toEarch) {
        this.isActive5 = false;
      } else {
        this.isActive5 = !this.isActive5;
      }
      this.BMap.view.removeAllLayers();

      if (this.isActive5) {
        this.BMap.$refs.chinaEdgeLayer.hideMask();
        // this.BMap.$refs.provincePolygonLayer.show();
        this.BMap.map.setMapType(BMAP_EARTH_MAP);
      } else {
        this.BMap.$refs.chinaEdgeLayer.showMask();
        // this.BMap.$refs.provincePolygonLayer.hide();
        this.BMap.map.setMapType(BMAP_NORMAL_MAP);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
$defaultColor: #b9dbf6;
$activeColor: #f3c569;
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
  .imgs-wrapper,
  .lng-lat {
    position: absolute;
    z-index: 2023;
  }

  .img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
  .imgs-wrapper {
    right: 469px;
    top: 112px;
    display: flex;
    .imgs {
      display: flex;
      flex-direction: column;

      .img:nth-of-type(1) {
        display: none;
        cursor: pointer;
        background: url("~@/assets/images/icons/1.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/1-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(2) {
        display: none;
        cursor: pointer;
        background: url("~@/assets/images/icons/2.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/2-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(3) {
        display: none;
        cursor: pointer;
        background: url("~@/assets/images/icons/3.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/3-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(4) {
        cursor: pointer;
        background: url("~@/assets/images/icons/4.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/4-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(5) {
        cursor: pointer;
        background: url("~@/assets/images/icons/5.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/5-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(6) {
        cursor: pointer;
        background: url("~@/assets/images/icons/6.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/6-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(7) {
        cursor: pointer;
        background: url("~@/assets/images/icons/7.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/7-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .img:nth-of-type(8) {
        cursor: pointer;
        background: url("~@/assets/images/icons/8.png") no-repeat;
        background-size: 100% 100%;

        &.active,
        &:hover {
          background: url("~@/assets/images/icons/8-1.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .lng-lat {
    left: 20px;
    // right: 469px;
    bottom: 20px;
    color: #c1dee9;
    font-size: 12px;
  }
}
</style>