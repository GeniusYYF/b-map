<template>
  <v-region
    class="region"
    ref="region"
    type="group"
    :search="true"
    @values="regionChange"
  ></v-region>
</template>
<script>
export default {
  name: "",
  components: {},
  props: ["BMap"],
  mixin: {},
  data: function () {
    return {
      region: {},
      activeLevel: 0,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$refs.region.$el.click();
    console.log(this.BMap);
  },
  methods: {
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
      this.loadCity(value, level);

      if (level === 3) {
        this.$emit("close");
      }
    },
    loadCity(name, level) {
      console.log(name);
      this.BMap.map.clearOverlays();
      if (!name) {
        this.BMap.map.flyTo(new BMapGL.Point(108, 38), 5.5);
        this.$store.commit("setActiveLevel", 1);
        return;
      }
      this.BMap.$refs.selectPolygonLayer.loadAreaEdgeLayer(name, level);
      this.activeLevel = level;
      this.$store.commit("setActiveLevel", this.activeLevel);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.region {
  opacity: 0;
  position: absolute;
  top: 0;
}
</style>
<style lang="scss">
.v-dropdown-container {
  transform: translate(17px, 6px);
  width: 438px;
}
</style>