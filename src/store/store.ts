import { createStore, Store } from 'vuex';

// 1. 定义state的类型
interface State {
  user: User | null;
}

interface User {
  // 根据你的应用需求定义用户的属性
  id: number;
  name: string;
  email: string;
  // ...其他属性
}

// 2. 创建并导出store
export default createStore<State>({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user: User) {
      state.user = user;
    }
  },
  actions: {
    loginUser({ commit }, userInfo: User) {
      // 登录逻辑
      commit('SET_USER', userInfo);
      console.log('登录成功');
    }
  }
});
