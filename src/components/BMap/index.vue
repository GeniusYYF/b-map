<template>
  <div class="map">
    <div class="map-container" :id="id || 'mapContainer'"></div>

    <map-control ref="mapControl"></map-control>
    <map-btns v-if="!hideTools" ref="mapBtns"></map-btns>

    <china-edge-layer ref="chinaEdgeLayer"></china-edge-layer>
    <province-polygon-layer ref="provincePolygonLayer"></province-polygon-layer>
    <select-polygon-layer ref="selectPolygonLayer"></select-polygon-layer>
    <map-title-layer
      ref="mapTitleLayer"
      :title="mapTitle"
      :date="mapDate"
    ></map-title-layer>

    <x-y-z-layers ref="xyzLayers"></x-y-z-layers>
    <image-layers ref="imageLayers"></image-layers>

    <qi-xiang-zhan ref="qxz" @openWindow="openWindow"></qi-xiang-zhan>
    <hu-po ref="hupo" @openWindow="openWindow"></hu-po>
    <jiang-he-lai-shui
      ref="jianghelaishui"
      @openWindow="openWindow"
    ></jiang-he-lai-shui>
    <shui-ku-xu-shui
      ref="shuikuxushui"
      @openWindow="openWindow"
    ></shui-ku-xu-shui>
    <tu-rang-shang-qing
      ref="turangshangqing"
      @openWindow="openWindow"
    ></tu-rang-shang-qing>

    <jiao-he ref="jiaohe"></jiao-he>
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
import MapTools from "@/utils/coordtransform.js";

import ChinaEdgeLayer from "./components/Layers/ChinaEdgeLayer.vue";
import ProvincePolygonLayer from "./components/Layers/ProvincePolygonLayer.vue";
import SelectPolygonLayer from "./components/Layers/SelectPolygonLayer.vue";
import MapTitleLayer from "./components/Layers/MapTitleLayer.vue";

import XYZLayers from "./components/Layers/XYZLayers.vue";
import ImageLayers from "./components/MarkLayers/ImageLayers.vue";

import QiXiangZhan from "./components/MarkLayers/QiXiangZhan.vue";
import JiaoHe from "./components/MarkLayers/JiaoHe.vue";
import HuPo from "./components/MarkLayers/1-1/HuPo.vue";
import JiangHeLaiShui from "./components/MarkLayers/3-1/JiangHeLaiShui.vue";
import ShuiKuXuShui from "./components/MarkLayers/3-1/ShuiKuXuShui.vue";
import TuRangShangQing from "./components/MarkLayers/3-1/TuRangShangQing.vue";

import mapStyle from "@/assets/mapStyle.js";

export default {
  name: "",
  components: {
    MapControl,
    MapBtns,

    ChinaEdgeLayer,
    ProvincePolygonLayer,
    SelectPolygonLayer,
    MapTitleLayer,

    XYZLayers,
    ImageLayers,

    QiXiangZhan,
    JiaoHe,
    HuPo,
    JiangHeLaiShui,
    ShuiKuXuShui,
    TuRangShangQing,
  },
  props: [
    "baseMapType",
    "hideTools",
    "id",
    "notPlay",
    "notBase",
    "centerAndZoom",
    "mapTitle",
    "mapDate",
    "loadXYZList",
  ],
  mixin: {},
  data: function () {
    return {
      map: null,
      view: null,
      infoWindow: null,
    };
  },
  computed: {},
  watch: {
    baseMapType(k) {
      this.showImageLayerForKey(k);
    },
  },
  created: function () {},
  mounted: function () {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.map = this.initMap({
        center: [108, 40],
        zoom: 0,
        style: mapStyle.purpleStyle,
      });
      // 隐藏无用图层
      this.map.setDisplayOptions({
        poiText: false, // poi文本
        poiIcon: false, // poi图标
        // overlay: false, // 覆盖物
        // layer: false, // 图层
        building: false, // 3d建筑物
        street: false, // 路网
      });
      this.view = new mapvgl.View({ map: this.map });
      this.loadWindow();

      this.$refs.xyzLayers.init(this.map, this.loadXYZList);
      // this.$refs.imageLayers.init();
      this.$refs.qxz.init();
      this.$refs.hupo.init();
      this.$refs.jianghelaishui.init();
      this.$refs.shuikuxushui.init();
      this.$refs.turangshangqing.init();
      // 播放动画
      this.notPlay
        ? this.initZoom()
        : this.play(new BMapGL.Point(108, 40), 300);
      // 描点记录
      // loadDrawDot();
      setTimeout(() => {
        this.$refs.mapBtns?.init(this);
        this.$refs.mapControl.init(this.map);

        // this.$refs.chinaEdgeLayer.init(this.map);
        this.$refs.provincePolygonLayer?.init(this.map, this);
        this.$refs.selectPolygonLayer.init(this.map);
        this.$refs.mapTitleLayer.init(this.map);

        this.showXYZLayer("BaseMap");
        // 加载基础底图
        // this.notBase ? "" : this.showImageLayerForKey("base");
        // this.$refs.provincePolygonLayer.show();

        this.$emit("loaded", this);
      }, 2000);

      console.log(this.map);
      console.log(this.view);

      // 定义XYZLayer图层
      // var wmts = new BMapGL.XYZLayer({
      //   // useThumbData: true, //如果影响透明图层的展示效果，可以设置false；如果非透明图层，可以设置true
      //   tileUrlTemplate:
      //     "https://gatewayproxy-jcpt.mwr.cn/riverv/wmts100?" +
      //     "k=DTCqEqH7ofG00Zkkw2QtOA==&layer=river_v&style=default&tilematrixset=Custom_river_v&Service=WMTS&" +
      //     "Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=[z]&TileCol=[x]&TileRow=[y]",
      //   // extentCRSIsWGS84: true, // tms:false,//tileUrlTemplate中[y]是否为tms请求服务形式。默认false。如果是则设置为true。
      //   // boundary:[], // 设置图层掩膜。可通过BMapGL.Boundary()获取行政区域的坐标数据。
      //   xTemplate: (x, y, z) => {
      //     // return parseInt((x * 2) ^ ((z - 18) / 256));
      //     // let point = { lng: x, lat: y };
      //     // let point1 = MapTools.transformWGS2GCJ(point);
      //     // let point2 = MapTools.marsTobaidu(point1);
      //     // let point3 = MapTools.convertBdLL2MC(point2);
      //     // return point3.lng;
      //     console.log(x, y, z);
      //     console.log((x * 2) ^ ((z - 18) / 256));
      //     return parseInt((x * 2) ^ ((z - 18) / 256));
      //     // return x;
      //   },
      //   yTemplate: (x, y, z) => {
      //     // let point = { lng: x, lat: y };
      //     // let point1 = MapTools.transformWGS2GCJ(point);
      //     // let point2 = MapTools.marsTobaidu(point1);
      //     // let point3 = MapTools.convertBdLL2MC(point2);
      //     // return point3.lat;
      //     return y;
      //   },
      //   // xTemplate: (x, y, z) => {
      //   //   return parseInt((x * 2) ^ ((z - 18) / 256));
      //   // },
      //   // yTemplate: (x, y, z) => {
      //   //   return parseInt((y * 2) ^ ((z - 18) / 256));
      //   // },
      // });
      // this.map.addTileLayer(wmts);
      console.log(MapTools);
    },
    initMap(options) {
      options = Object.assign(
        {
          tilt: 0,
          heading: 0,
          maxZoom: 5,
        },
        options
      );
      var map = new BMapGL.Map(this.id || "mapContainer", {
        // restrictCenter: false,
        style: { styleJson: options.style || mapStyle.darkStyle },
      });

      map.enableKeyboard();
      map.enableScrollWheelZoom();
      map.enableInertialDragging();
      map.enableContinuousZoom();

      map.setDisplayOptions(
        options.displayOptions || {
          indoor: false,
          poi: true,
          skyColors: options.skyColors || [
            "rgba(5, 5, 30, 0.01)",
            "rgba(5, 5, 30, 1.0)",
          ],
        }
      );
      if (options.center && (options.zoom || options.zoom === 0)) {
        let center = options.center;
        if (center instanceof Array) {
          center = new BMapGL.Point(options.center[0], options.center[1]);
        }
        map.centerAndZoom(center, options.zoom);
      } else {
        map.centerAndZoom(new BMapGL.Point(108, 38), 0);
      }

      map.setTilt(options.tilt);
      map.setHeading(options.heading);
      return map;
    },
    loadWindow() {
      this.infoWindow = new BMapGL.InfoWindow("", { enableCloseOnClick: true });
      // console.log(this.infoWindow);
    },
    openWindow(title, html, point) {
      console.log(title);
      // this.map.closeInfoWindow();
      // this.infoWindow = new BMapGL.InfoWindow(html, { title });
      this.infoWindow.setTitle(title);
      this.infoWindow.setContent(html);
      this.map.openInfoWindow(this.infoWindow, point);
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
    initZoom() {
      if (this.centerAndZoom) {
        console.log(this.centerAndZoom);
        let list = this.centerAndZoom.split(",");
        this.map.flyTo(
          new BMapGL.Point(Number(list[0]), Number(list[1])),
          Number(list[2])
        );
      } else {
        this.map.flyTo(new BMapGL.Point(104.5, 40), 5.15);
      }
    },
    // 播放动画
    play(point, time) {
      let map = this.map;
      map.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式
      setTimeout(() => {
        map.zoomOut();
        setTimeout(() => {
          map.flyTo(point, 1.5);
          setTimeout(() => {
            map.flyTo(point, 3);
            setTimeout(() => {
              map.flyTo(point, 5);
              setTimeout(() => {
                map.setMapType(BMAP_NORMAL_MAP); // 设置地图类型为地球模式
              }, time);
            }, time);
          }, time);
        }, time);
      }, 2000);
    },
    showImageLayerForKey(k) {
      console.log("update", k);
      let layerDict = this.$refs.imageLayers.layerDict;
      if (k) {
        this.map.removeOverlay(layerDict[k].layer);
        this.map.addOverlay(layerDict[k].layer);
      }
    },
    showImageLayerForKeyOnly(k) {
      console.log("update only", k);
      let layerDict = this.$refs.imageLayers.layerDict;
      for (let key in layerDict) {
        if (key !== "base") this.map.removeOverlay(layerDict[key].layer);
      }
      if (k) {
        this.map.removeOverlay(layerDict[k].layer);
        this.map.addOverlay(layerDict[k].layer);
      }
    },
    hideImageLayerForKey(k) {
      console.log("hide", k);
      let layerDict = this.$refs.imageLayers.layerDict;
      if (k) {
        this.map.removeOverlay(layerDict[k].layer);
      }
    },
    showXYZLayer(layer, top = true) {
      this.$refs.xyzLayers.show(this.map, layer, top);
    },
    hideXYZLayer(layer) {
      this.$refs.xyzLayers.hide(this.map, layer);
    },
    changeXZYLayer(layer, bool, top = true) {
      bool ? this.showXYZLayer(layer, top) : this.hideXYZLayer(layer);
    },
    topXZYLayer(layer) {
      this.$refs.xyzLayers.topXZYLayer(this.map, layer);
    },
    loadHq() {
      this.$refs.xyzLayers.loadHq(this.map);
    },
    hideHq() {
      this.$refs.xyzLayers.hideHq(this.map);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.map,
.map-container {
  height: inherit;
  position: relative;
  width: 100%;
  height: 100%;
  // color: #ffd33a;
  color: rgb(243, 197, 105);
}
</style>