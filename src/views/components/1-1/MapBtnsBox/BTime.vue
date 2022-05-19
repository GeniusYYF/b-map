<template>
  <div class="date">
    <el-date-picker
      v-show="dateType === 'date'"
      ref="date"
      v-model="date"
      type="date"
      :editable="false"
      placeholder="选择日期"
      @blur="close"
    >
    </el-date-picker>
    <el-date-picker
      v-show="dateType === 'daterange'"
      ref="date"
      v-model="dateRange"
      type="daterange"
      :editable="false"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @blur="close"
      @change="change"
    >
    </el-date-picker>
    <!-- <el-button
      class="expand"
      :icon="
        dateType === 'date' ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
      "
      @click="dateTypeChange"
    >
    </el-button> -->
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: ["BMap"],
  mixin: {},
  data: function () {
    return {
      date: "",
      dateRange: ["2019-09-21", "2019-10-11"],
      dateType: "daterange",
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$refs.date.focus();
    // this.$refs.date.showPicker();
  },
  methods: {
    dateTypeChange() {
      this.dateType = this.dateType === "date" ? "daterange" : "date";
    },
    close() {
      this.$emit("close");
    },
    change(v) {
      this.BMap.$refs.mapTitleLayer.setDate({
        name: v[0],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.date {
  opacity: 0;
  position: absolute;
  top: 0;
}
</style>
<style lang="scss">
.el-picker-panel {
  // transform: translate(62px, -1px);
  .popper__arrow {
    display: none;
  }
}
</style>