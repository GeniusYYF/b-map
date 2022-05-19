<template>
  <div class="s6">
    <img class="bg" src="@/assets/images/statistic/6-bg.png" />
    <div v-show="active === 1">
      <img
        class="menu"
        src="@/assets/images/statistic/6-1-1.png"
        @click="active = 6"
      />
      <img class="content" src="@/assets/images/statistic/6-1-2.png" />
    </div>
    <div v-show="active === 6">
      <img
        class="menu"
        src="@/assets/images/statistic/6-6-1.png"
        @click="active = 1"
      />
      <img
        class="content"
        src="@/assets/images/statistic/6-6-2.png"
        @click="showDialog = true"
      />
    </div>
    <img
      v-show="showDialog"
      class="dialog"
      src="@/assets/images/statistic/6-6-3.png"
      @click="showDialog = false"
    />
  </div>
</template>
<script>
import AsideMenu from "@/components/AsideMenu";

export default {
  name: "",
  components: { AsideMenu },
  props: {},
  mixin: {},
  data: function () {
    return {
      active: 1,
      showDialog: false,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.s6 {
  position: relative;
  height: 100%;
  width: 100%;
}
.bg,
.menu,
.content,
.dialog {
  position: absolute;
  z-index: 2022;
}
.bg {
  z-index: 0;
  left: 0;
  top: 0;
}
.menu {
  left: 20px;
  bottom: 20px;
}
.content {
  right: 20px;
  bottom: 20px;
}
.dialog {
  z-index: 2030;
  left: 0;
  top: 0;
}
</style>