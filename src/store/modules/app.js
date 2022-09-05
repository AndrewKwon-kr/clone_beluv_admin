// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: '메인화면',
      icon: 'mdi-monitor',
      to: '/',
    },
    
    {
      title: '제품목록',
      icon: 'mdi-apps',
      to: '/components/profile/',
    },
    {
      title: '베럽TV',
      icon: 'mdi-monitor',
      to: '/tables/regular/',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
