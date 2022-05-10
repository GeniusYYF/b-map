<template>
  <div class="map">
    <div id="mapContainer"></div>

    <map-control ref="mapControl"></map-control>
    <map-btns
      ref="mapBtns"
      @changeMapToEarch="changeMapToEarch"
      @loadCity="loadCity"
      @qxzChangeVisible="qxzChangeVisible"
    ></map-btns>

    <china-edge-layer ref="chinaEdgeLayer"></china-edge-layer>
    <province-polygon-layer ref="provincePolygonLayer"></province-polygon-layer>
    <select-polygon-layer ref="selectPolygonLayer"></select-polygon-layer>

    <qi-xiang-zhan ref="qxz"></qi-xiang-zhan>
  </div>
</template>
<script>
/* global BMapGL */
/* global mapv */
/* global mapvgl */
/* local initMap */
/* local mapStyle purpleStyle */
import MapControl from "./components/MapControl.vue";
import MapBtns from "./components/MapBtns.vue";

import ChinaEdgeLayer from "./components/ChinaEdgeLayer.vue";
import ProvincePolygonLayer from "./components/ProvincePolygonLayer.vue";
import SelectPolygonLayer from "./components/SelectPolygonLayer.vue";

import QiXiangZhan from "./components/layers/QiXiangZhan.vue";

import mapStyle from "@/assets/mapStyle.js";

export default {
  name: "",
  components: {
    ChinaEdgeLayer,
    ProvincePolygonLayer,
    SelectPolygonLayer,
    MapControl,
    MapBtns,
    QiXiangZhan,
  },
  props: {},
  mixin: {},
  data: function () {
    return {
      map: null,
      view: null,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.init();
  },
  methods: {
    init() {
      let map = this.initMap({
        mapType: BMAP_NORMAL_MAP, // BMAP_NORMAL_MAP BMapGL_SATELLITE_MAP BMapGL_HYBRID_MAP
        enableHighResolution: true,
      });

      map.setCurrentCity("中华人民共和国");
      map.centerAndZoom("中华人民共和国");

      // map.enableKeyboard();
      map.enableScrollWheelZoom();
      map.enableDragging();
      map.enableInertialDragging();
      map.enableContinuousZoom();

      map.setMapStyle(mapStyle.purpleStyle);

      // 隐藏无用图层
      // this.map.setDisplayOptions({
      //   poiText: false, // poi文本
      //   poiIcon: false, // poi图标
      //   // overlay: false, // 覆盖物
      //   layer: false, // 图层
      //   building: false, // 3d建筑物
      //   street: false, // 路网
      // });
      this.view = new mapvgl.View({ map });
      this.map = map;

      // 播放动画
      this.play(new BMapGL.Point(108, 38), 300);

      // 描点记录
      // loadDrawDot();

      // 加载行政区划
      setTimeout(() => {
        this.map.addEventListener("mousemove", (e) => {
          this.$refs.mapBtns.lat = e.latlng.lat.toFixed(2);
          this.$refs.mapBtns.lng = e.latlng.lng.toFixed(2);
        });

        this.$refs.mapControl.init(this.map);
        this.$refs.chinaEdgeLayer.init(this.map);
        this.$refs.provincePolygonLayer.init(this.map);
        this.$refs.selectPolygonLayer.init(this.map);

        this.$refs.qxz.init(this.map, this.view);
      }, 1500);
    },
    initMap(options) {
      var map = new BMapGL.Map("mapContainer", {
        // restrictCenter: false,
        style: { styleJson: options.style || mapStyle.darkStyle },
      });

      // map.setDisplayOptions(
      //   options.displayOptions || {
      //     indoor: false,
      //     poi: true,
      //     skyColors: options.skyColors || [
      //       "rgba(5, 5, 30, 0.01)",
      //       "rgba(5, 5, 30, 1.0)",
      //     ],
      //   }
      // );
      if (options.center && (options.zoom || options.zoom === 0)) {
        let center = options.center;
        if (center instanceof Array) {
          center = new BMapGL.Point(options.center[0], options.center[1]);
        }
        map.centerAndZoom(center, options.zoom);
      } else {
        map.centerAndZoom(new BMapGL.Point(108, 38), 0);
      }

      // map.setTilt(options.tilt);
      // map.setHeading(options.heading);
      // map.setMapType(BMapGL_EARTH_MAP); // 设置地图类型为地球模式
      console.log(map);
      return map;
    },
    // 描点记录
    loadDrawDot() {
      let list = [];
      let lists = [];
      this.map.addEventListener("click", function (e) {
        list.push([e.latlng.lng, e.latlng.lat]);
      });
      this.map.addEventListener("dblclick", function (e) {
        console.log(lists);
      });
      this.map.addEventListener("rightclick", function (e) {
        lists.push(list);
        list = [];
      });
    },
    // 播放动画
    play(point, time) {
      let map = this.map;
      setTimeout(() => {
        map.zoomOut();
        setTimeout(() => {
          map.flyTo(point, 1.5);
          setTimeout(() => {
            map.flyTo(point, 3);
            setTimeout(() => {
              map.flyTo(point, 5);
            }, time);
          }, time);
        }, time);
      }, 2000);
    },
    changeMapToEarch(flag) {
      this.map.setMapType(flag ? BMapGL_EARTH_MAP : BMAP_NORMAL_MAP);
    },
    loadCity(name, level) {
      console.log(name);
      this.changeMapToEarch(false);
      this.$refs.mapBtns.fullMapActive = false;
      this.map.clearOverlays();
      if (!name) {
        this.map.flyTo(new BMapGL.Point(108, 38), 5.5);
        return;
      }
      this.$refs.selectPolygonLayer.loadAreaEdgeLayer(name, level);
    },
    qxzChangeVisible() {
      let layer = this.view.layerManager.layers.filter(
        (_) => _.options.name === "QxzIconLayer"
      )[0];
      console.log(layer);
      layer._visible ? layer.hide() : layer.show();
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.map,
#mapContainer {
  height: inherit;
  position: relative;
  // color: #ffd33a;
}
</style>