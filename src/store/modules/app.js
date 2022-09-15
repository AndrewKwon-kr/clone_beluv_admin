// Pathify
import { make } from "vuex-pathify";

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: "메인화면",
      icon: "mdi-monitor",
      to: "/",
    },

    {
      title: "베럽TV",
      icon: "mdi-play-box-multiple",
      to: "/play/",
    },
    {
      title: "리뷰관리",
      icon: "mdi-comment-edit",
      to: "/review/",
    },
  ],
};

const mutations = make.mutations(state);

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
