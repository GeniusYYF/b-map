<template>
  <div v-show="show" class="b-header">
    <div class="btn time">
      <img src="@/assets/images/icons/time.png" />
      <span>{{ now[0] }}</span>
      <span>{{ now[1] }}</span>
    </div>
    <div class="btns">
      <div class="btn" @click="toAppPage">
        <img src="@/assets/images/icons/app.png" />
        <span>移动端</span>
      </div>
      <div class="btn">
        <img src="@/assets/images/icons/notice.png" />
        <span>消息</span>
      </div>
      <div class="btn">
        <img src="@/assets/images/icons/user.png" />
        <span>admin</span>
      </div>
      <div class="btn">
        <img src="@/assets/images/icons/quit.png" />
        <span>退出</span>
      </div>
    </div>

    <div class="nav">
      <div class="nav-left">
        <div
          class="nav-item"
          :class="{ active: active === 1 }"
          @click="click(1)"
        >
          综合监测
        </div>
        <div
          class="nav-item"
          :class="{ active: active === 2 }"
          @click="click(2)"
        >
          对比分析
        </div>
        <div
          class="nav-item"
          :class="{ active: active === 3 }"
          @click="click(3)"
        >
          单指标监测
        </div>
      </div>
      <div class="nav-right">
        <div
          class="nav-item"
          :class="{ active: active === 4 }"
          @click="click(4)"
        >
          旱情校核
        </div>
        <div
          class="nav-item"
          :class="{ active: active === 5 }"
          @click="click(5)"
        >
          会商发布
        </div>
        <div
          class="nav-item"
          :class="{ active: active === 6 }"
          @click="click(6)"
        >
          系统管理
        </div>
      </div>
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
      now: [],
      interval: null,
      active: 1,
      show: true,
      paths: ["", "/1-1", "/2-1", "/3-1", "4-1", "5-1", "6-1"],
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    if (location.hash === "#/") {
      this.active = 1;
    } else {
      this.active = Number(location.hash.split("/")[1].split("-")[0]);
    }
    console.log("当前激活导航：", this.active, location.hash);
    this.loadTime();
    if (!this.active) {
      this.show = false;
    }
  },
  methods: {
    click(i) {
      if (i !== this.active) {
        this.active = i;
        this.$router.push(this.paths[i]);
      }
    },
    loadTime() {
      this.now = this.dateFormat({
        ch: [
          ["-", "-", ""],
          [":", ":", ""],
        ],
      });
      this.interval = setInterval(() => {
        this.now = this.dateFormat({
          ch: [
            ["-", "-", ""],
            [":", ":", ""],
          ],
        });
      }, 1000);
    },
    dateFormat(options) {
      const date = options?.date || new Date();
      const ch = options?.ch || "-";
      if (!(date instanceof Date)) return date;

      let formatNumber = (n) => {
        n = n.toString();
        return n[1] ? n : "0" + n;
      };
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
      if (Array.isArray(ch)) {
        return [
          [year, month, day]
            .map(formatNumber)
            .map((_, i) => _ + ch[0][i])
            .join(""),
          [hour, minute, second]
            .map(formatNumber)
            .map((_, i) => _ + ch[1][i])
            .join(""),
        ];
      }
      return [
        [year, month, day].map(formatNumber).join(ch),
        [hour, minute, second].map(formatNumber).join(":"),
      ];
    },
    toAppPage() {
      // this.$router.push("/app-page");
      let routeUrl = this.$router.resolve({
        path: "/app-page",
        query: {},
      });
      window.open(routeUrl.href, "_blank");
    },
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.b-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2022;
  width: 1920px;
  height: 115px;
  background: url("~@/assets/images/header.png") no-repeat;
  background-size: 100% 100%;

  .time {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 14px !important;
    font-family: "Digital";
    font-weight: 600;
  }
  .btn {
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: #cbb78f;
    padding: 4px 8px;
    border-radius: 10px;
    span {
      margin-left: 4px;
    }
  }
  .btns {
    position: absolute;
    top: 12px;
    right: 10px;
    display: flex;
    .btn {
      margin-left: 8px;
      &:hover {
        cursor: pointer;
        background-color: rgb(243, 197, 105);
      }
      &:last-child:hover {
        background-color: rgb(243, 123, 105);
      }
    }
  }

  .nav {
    position: absolute;
    top: 57px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 1920px;
    padding: 0 20px;

    .nav-item {
      width: 175px;
      height: 32px;
      color: #9ad4ff;
      font-size: 24px;
      font-weight: border;
      font-family: "YouSheBiaoTiHei";
      cursor: pointer;
    }
    .nav-left {
      display: flex;
      .nav-item {
        background: url("~@/assets/images/nav-left.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 15px;
        &.active {
          background: url("~@/assets/images/nav-left-active.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .nav-right {
      display: flex;
      .nav-item {
        background: url("~@/assets/images/nav-right.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 15px;
        &.active {
          background: url("~@/assets/images/nav-right-active.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>