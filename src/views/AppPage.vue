<template>
  <div class="app-page">
    <img class="img" src="@/assets/images/statistic/app-page.png" />
    <img class="bg" src="@/assets/images/statistic/6-bg.png" />
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  mixin: {},
  data: function () {
    return {};
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
.app-page {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  .img {
    transform: scale(0.9);
  }
}
.bg {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
}
</style>