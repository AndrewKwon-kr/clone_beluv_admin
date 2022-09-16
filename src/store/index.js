// Vue
import Vue from 'vue';
import Vuex from 'vuex';
import pathify from '@/plugins/vuex-pathify';

// Modules
import * as modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [pathify.plugin],
  state: {
    message: 'Hello',
    data: [],
    today: '',
  },
  mutations: {
    changeMessage(state, newMsg) {
      state.message = newMsg;
    },
    getData(state, data) {
      state.data = data;
      state.today = data.today;
    },
  },
  actions: {
    callMutation({ state, commit }, { newMsg }) {
      commit('changeMessage', newMsg);
    },
    getUserData({ state, commit }, { data }) {
      console.log(state);
      commit('getData', data);
    },
  },
  getters: {
    getMsg(state) {
      return `${state.message} => Length : ${state.message.length}`;
    },
  },
});

store.subscribe((mutation) => {
  if (!mutation.type.startsWith('user/')) return;

  store.dispatch('user/update', mutation);
});

store.dispatch('app/init');

export default store;

export const ROOT_DISPATCH = Object.freeze({ root: true });
