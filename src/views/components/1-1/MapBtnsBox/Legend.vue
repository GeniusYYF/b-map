<template>
  <div class="legends">
    <div class="title-wrapper">
      <div class="title">图层控制</div>
      <div class="close" @click="close">x</div>
    </div>
    <div class="body">
      <el-collapse accordion style="margin-bottom: 8px">
        <el-collapse-item>
          <template slot="title"> <el-checkbox>测站</el-checkbox> </template>

          <div class="row inner" v-for="(item, i) in checkList3" :key="i">
            <el-collapse v-if="item.children" accordion>
              <el-collapse-item class="no-padding">
                <template slot="title">
                  <div class="row inner title">
                    <el-checkbox
                      :label="item.label"
                      @change="selectAll"
                    ></el-checkbox>
                  </div>
                </template>

                <div
                  class="row inner"
                  v-for="(item2, j) in item.children"
                  :key="j"
                >
                  <el-checkbox
                    :label="item2.label"
                    @change="(val) => change(val, item2.k)"
                  ></el-checkbox>
                </div>
              </el-collapse-item>
            </el-collapse>
            <el-checkbox
              v-else
              :label="item.label"
              @change="(val) => change(val, item.k)"
            ></el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse accordion style="margin-bottom: 8px">
        <el-collapse-item>
          <template slot="title">
            <el-checkbox>土地利用</el-checkbox>
          </template>

          <div class="row inner" v-for="(item, i) in checkList4" :key="i">
            <el-checkbox
              :label="item.label"
              v-model="item.value"
              @change="(val) => change(val, item.k)"
            ></el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse accordion style="margin-bottom: 8px">
        <el-collapse-item>
          <template slot="title">
            <el-checkbox @change="(val) => change(val, 'gq')">灌区</el-checkbox>
          </template>

          <div class="row inner" v-for="(item, i) in checkList5" :key="i">
            <el-checkbox
              :label="item.label"
              @change="(val) => change(val, item.k)"
            ></el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <el-checkbox>作物分布</el-checkbox>
          </template>

          <div class="row inner" v-for="(item, i) in checkList2" :key="i">
            <el-collapse v-if="item.children" accordion>
              <el-collapse-item class="no-padding">
                <template slot="title">
                  <div class="row inner title">
                    <el-checkbox
                      :label="item.label"
                      v-model="item.value"
                      @change="selectAll"
                    ></el-checkbox>
                  </div>
                </template>

                <div
                  class="row inner"
                  v-for="(item2, j) in item.children"
                  :key="j"
                >
                  <el-checkbox
                    :label="item2.label"
                    v-model="item2.value"
                    @change="(val) => change(val, item2.k)"
                  ></el-checkbox>
                </div>
              </el-collapse-item>
            </el-collapse>
            <el-checkbox
              v-else
              :label="item.label"
              v-model="item.value"
              @change="(val) => change(val, item.k)"
            ></el-checkbox>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
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
      dict: {
        cd: "MuCaoXDM",
        ld: "LinDiXDM",
        gd: "GengDiXDM",
        yjd: "ShuiDao",
        dxm: "XiaoMai",
        cym: "YuMi",
      },
      checkList2: [
        { label: "晚稻", k: "wd", value: "" },
        { label: "一季稻", k: "yjd", value: "" },
        { label: "冬小麦", k: "dxm", value: "" },
        {
          label: "春玉米",
          k: "cym",
          value: "",
          children: [
            { label: "播种", k: "bz", value: "" },
            { label: "出苗", k: "cm", value: "" },
            { label: "三叶", k: "sy", value: "" },
          ],
        },
        { label: "夏玉米", k: "xym", value: "" },
      ],
      checkList3: [
        { label: "雨量站点", k: "qxz" },
        {
          label: "水文站点",
          k: "swz",
          children: [
            { label: "水位", k: "sw" },
            { label: "水库", k: "sk" },
            { label: "堰闸站", k: "yzz" },
          ],
        },
        { label: "墒情站点", k: "sqz" },
      ],
      checkList4: [
        { label: "耕地", k: "gd", value: "" },
        { label: "林地", k: "ld", value: "" },
        { label: "草地", k: "cd", value: "" },
      ],
      checkList5: [
        { label: "小型", k: "gqx" },
        { label: "中型", k: "gqz" },
        { label: "大地", k: "gqd" },
      ],
    };
  },
  computed: {},
  watch: {
    "$store.getters.getLegendStatus"(val) {
      console.log(val, 111);
      for (let k in val) {
        for (let item of this.checkList2) {
          if (this.dict[item.k] === k) {
            item.value = val[k];
          }
        }
        for (let item of this.checkList4) {
          if (this.dict[item.k] === k) {
            item.value = val[k];
          }
        }
      }
      console.log(this.checkList4);
    },
  },
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {});
  },
  methods: {
    close() {
      this.$emit("close");
    },
    selectAll(v, e) {
      console.log(v, e);
      e.stopPropagation();
      e.preventDefault();
    },
    change(val, k) {
      console.log(k);
      if (Object.keys(this.dict).includes(k)) {
        this.BMap.changeXZYLayer(this.dict[k], val);
        console.log(this.$store);
        this.$store.commit("setLegendStatusProp", { k: this.dict[k], v: val });
      } else {
        let layer = this.BMap.$refs[k]?.layer;
        val
          ? this.BMap.view.addLayer(layer)
          : this.BMap.view.removeLayer(layer);
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

.legends {
  // @include box;
  // position: absolute;
  // z-index: 2022;
  // left: 1197px;
  // top: 112px;
  // width: 210px;
  position: absolute;
  top: 0;
  width: 438px;
  margin-top: 3px;
  background-color: rgba(0, 10, 49, 0.79);
  border: 1px solid #1a8eff;
  box-shadow: 0 0 46px 0 rgba(26, 59, 255, 0.43) inset;
  transform: translate(0px, 44px);

  //   height: 520px;
  .title-wrapper {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(120, 188, 255, 0.445);
    .title,
    .close {
      //   color: $activeColor;
      color: #459bf2;
      cursor: pointer;
    }
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;

    padding: 8px 12px;
    max-height: 520px;
    max-height: 298px;
    overflow-y: auto;

    .el-collapse {
      width: 48%;
      // box-sizing: border-box;
      border: none;
      ::v-deep .el-collapse-item__header {
        background-color: transparent;
      }
    }
    .el-checkbox.is-checked {
      background: transparent;
    }
    .row {
      width: 100%;
      padding-bottom: 8px;
      &:last-child {
        padding-bottom: 0;
      }

      .el-checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        ::v-deep .el-checkbox__input {
          .el-checkbox__inner {
            background-color: transparent;
          }
        }

        // padding: 8px;
        ::v-deep .el-checkbox__label {
          display: flex;
          justify-content: space-between;
          align-items: center;

          flex: 1;
          border: 1px solid rgba(185, 219, 246, 0.4);
          padding: 4px 8px;
          width: 100%;
          margin-left: 12px;
          font-size: 12px;

          &::after {
            content: "";
            display: inline-block;
            height: 8px;
            width: 8px;
            // border: 1px solid snow;
            border-radius: 50%;
            // background-color: rgb(70, 181, 255);
          }
        }
      }
      .el-checkbox.is-checked {
        background: none;

        ::v-deep .el-checkbox__input {
          .el-checkbox__inner {
            background-color: $activeColor;
          }
        }
      }
    }

    .row.inner {
      display: flex;
      justify-content: center;
      padding-bottom: 0;
      .el-checkbox {
        width: 80%;
        ::v-deep .el-checkbox__label {
          border: none;
          margin-left: 0;
        }
      }

      .el-collapse {
        background-color: rgb(55, 67, 101);
        background-color: rgba(55, 67, 101, 0.5);
        border: none;
        width: 100%;
        text-align: center;

        .el-collapse-item {
          display: inline-block;
          width: 80%;
          ::v-deep .el-collapse-item__header {
            background-color: transparent;
          }
          ::v-deep .el-collapse-item__content {
            padding-top: 0;
            padding-bottom: 0;
          }
          .row.inner.title {
            justify-content: start;
            .el-checkbox {
              width: 100%;
            }
          }
          .row.inner {
            padding-bottom: 0;
          }
        }
      }
    }
    .row.inner.title {
      padding: 0;
    }

    .row:nth-of-type(1) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(75, 204, 30);
    }
    .row:nth-of-type(2) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(70, 255, 229);
    }
    .row:nth-of-type(3) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(249, 255, 70);
    }
    .row:nth-of-type(4) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(255, 70, 252);
    }
    .row:nth-of-type(5) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(255, 70, 116);
    }
    .row:nth-of-type(6) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(255, 224, 70);
    }
    .row:nth-of-type(7) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(255, 119, 70);
    }
    .row:nth-of-type(8) .el-checkbox ::v-deep .el-checkbox__label::after {
      background-color: rgb(243, 255, 70);
    }
  }
}

.no-padding ::v-deep .el-collapse-item__header {
  padding: 0;
}
</style>