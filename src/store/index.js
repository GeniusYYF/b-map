import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    legendStatus: {
      MuCaoXDM: false,
      LinDiXDM: false,
      GengDiXDM: false,
      ShuiDao: false,
      XiaoMai: false,
      YuMi: false,
    },
    activeLevel: 0,
  },
  getters: {
    getLegendStatus(state) {
      return state.legendStatus
    },
    getActiveLevel(state) {
      return state.activeLevel
    },

  },
  mutations: {
    setLegendStatus(state, v) {
      state.legendStatus = v
    },
    setLegendStatusProp(state, { k, v }) {
      console.log(k, v)
      // state[k] = v
      state.legendStatus = JSON.parse(JSON.stringify({ ...state.legendStatus, [k]: v }))
    },
    setActiveLevel(state, v) {
      state.activeLevel = v
    },
  },
  actions: {
  },
  modules: {
  }
})
