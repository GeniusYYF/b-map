<template>
  <div class="aside-menu">
    <!-- unique-opened -->
    <div class="wrapper">
      <el-menu
        :default-active="defaultActive"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
      >
        <div v-for="(item, i) in list" :key="i">
          <el-submenu v-if="item.children.length > 0" :index="i + ''">
            <template slot="title">
              <i class="iconfont" :class="item.icon || defaultIcon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>

            <div v-for="(item2, j) in item.children" :key="j">
              <el-submenu v-if="item2.children.length > 0" :index="i + '-' + j">
                <template slot="title">
                  <i class="iconfont" :class="item2.icon || defaultIcon"></i>
                  <span slot="title">{{ item2.title }}</span>
                </template>

                <div v-for="(item3, k) in item2.children" :key="k">
                  <el-menu-item :index="i + '-' + j + '-' + k">
                    <template slot="title">
                      <span slot="title">{{ item3.title }}</span>
                    </template>
                  </el-menu-item>
                </div>
              </el-submenu>

              <el-menu-item v-else :index="i + '-' + j">
                <template slot="title">
                  <span slot="title">{{ item2.title }}</span>
                </template>
              </el-menu-item>
            </div>
          </el-submenu>

          <el-menu-item v-else :index="i + ''">
            <i class="iconfont" :class="item.icon || defaultIcon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    <div class="arrow" @click="isCollapse = !isCollapse"></div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: ["list", "defaultActive"],
  mixin: {},
  data: function () {
    return {
      isCollapse: false,
      defaultIcon: "el-icon-menu",
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {
      console.log(this.list);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(val) {
      this.$emit("select", val);
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.aside-menu {
  position: absolute;
  z-index: 2022;
  left: 20px;
  top: 112px;
  // width: 271px;
}
</style>