<template>
  <div class="s5">
    <b-map ref="BMap"></b-map>
    <!-- <div class="aside-menu-column">
        <div class="item" :class="{ active: active === 1 }" @click="click(1)">
          综 合
        </div>
        <div class="item" :class="{ active: active === 2 }" @click="click(2)">
          气 象
        </div>
        <div class="item" :class="{ active: active === 3 }" @click="click(3)">
          水 文
        </div>
        <div class="item" :class="{ active: active === 4 }" @click="click(4)">
          遥 感
        </div>
      </div> -->
    <div class="left" draggable="false">
      <img
        draggable="true"
        class="img1"
        src="@/assets/images/statistic/5-img.png"
        alt=""
        @dragstart="drag = 1"
      />
      <img
        draggable="true"
        class="img2"
        src="@/assets/images/statistic/5-img.png"
        alt=""
        @dragstart="drag = 2"
      />
      <img
        draggable="true"
        class="img3"
        src="@/assets/images/statistic/5-img.png"
        alt=""
        @dragstart="drag = 3"
      />
      <img src="@/assets/images/statistic/5-left.png" alt="" />
    </div>
    <div class="right" draggable="false">
      <img
        draggable="true"
        class="img1"
        src="@/assets/images/statistic/5-img2.png"
        alt=""
        @dragstart="drag = 4"
      />
      <img
        draggable="true"
        class="img2"
        src="@/assets/images/statistic/5-img2.png"
        alt=""
        @dragstart="drag = 5"
      />
      <img
        draggable="true"
        class="img3"
        src="@/assets/images/statistic/5-img2.png"
        alt=""
        @dragstart="drag = 6"
      />
      <img src="@/assets/images/statistic/5-right.png" alt="" />
    </div>

    <img class="legend" src="@/assets/images/statistic/5-legend.png" alt="" />
    <img
      class="start"
      v-show="!start"
      src="@/assets/images/statistic/5-start.png"
      alt=""
      @click="showDialog = true"
    />
    <img
      class="end"
      v-show="start"
      src="@/assets/images/statistic/5-end.png"
      alt=""
      @click="start = false"
    />

    <img
      v-show="start"
      class="baogao-btn"
      src="@/assets/images/statistic/5-report-btn.png"
      @click="showBaoGao = true"
    />

    <div class="mask" v-show="showDialog">
      <img
        class="img4"
        src="@/assets/images/statistic/5-dialog.png"
        @click="
          showDialog = false;
          start = true;
        "
      />
    </div>
    <img
      v-show="showBaoGao"
      class="img-baogao"
      src="@/assets/images/statistic/5-report.png"
      @click="showBaoGao = false"
    />
  </div>
</template>
<script>
import BMap from "@/components/BMap";

export default {
  name: "",
  components: { BMap },
  props: {},
  mixin: {},
  data: function () {
    return {
      start: false,
      showDialog: false,
      showBaoGao: false,
      drag: 1,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {
      setTimeout(() => {
        // this.$refs.BMap.showImageLayerForKeyOnly("base1");
      }, 2000);
      this.$refs.BMap.$el.ondragover = (e) => {
        //无法打印'drop', 默认情况下 拖动对象不能在某些元素中拖动,需要在dragOver时添加阻止默认事件
        e.preventDefault();
      };
      this.$refs.BMap.$el.ondrop = (e) => {
        console.log(e);
        // if (this.drag) {
        // this.$refs.BMap.showImageLayerForKeyOnly("base" + this.drag);
        // }
      };
    });
  },
  methods: {
    drop(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
::v-deep .lng-lat {
  display: none;
}
.s5 {
  position: relative;
  height: 100%;
  width: 100%;
}
.left,
.right,
.legend,
.start,
.end,
.baogao-btn,
.img-baogao,
.baogao-btn,
.img1,
.img2,
.img3 {
  position: absolute;
  z-index: 2022;
}
.left {
  left: 20px;
  bottom: 20px;
  user-select: none;
  .img1 {
    left: 35px;
    top: 96px;
  }
  .img2 {
    left: 35px;
    top: 400px;
  }
  .img3 {
    left: 35px;
    top: 690px;
  }
}
.right {
  right: 20px;
  bottom: 20px;
  user-select: none;
  .img1 {
    left: 35px;
    top: 96px;
  }
  .img2 {
    left: 35px;
    top: 400px;
  }
  .img3 {
    left: 35px;
    top: 690px;
  }
}
.legend {
  left: 487px;
  bottom: 20px;
}
.start,
.end {
  left: 780px;
  bottom: 20px;
}
.baogao-btn {
  left: 1422px;
  top: 312px;
  cursor: pointer;
}

.img-baogao {
  z-index: 20200;
  left: 625px;
  bottom: 125px;
}

.aside-menu-column {
  position: absolute;
  z-index: 2022;
  top: 112px;
  left: 0;
  display: flex;
  flex-direction: column;

  .item {
    padding: 20px 8px;
    margin-bottom: 18px;
    font-size: 18px;
    color: #9bd4ff;

    border: 1px solid #1a8eff;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: rgba($color: #0d45ff, $alpha: 0.14) !important;
    box-shadow: 0 0 11px 0 #1a79ff inset;

    cursor: pointer;
    // 文字竖向显示
    writing-mode: lr-tb;
    writing-mode: vertical-lr;
  }
  .item.active {
    border-color: #f3c569;
    background-color: transparent;
    box-shadow: none;
    color: #f3c569;
  }
}
</style>