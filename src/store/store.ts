import { createStore, Store } from 'vuex';

// 1. 定义state的类型
interface State {
  user: User | null;
  codingProblem: CodingProblem | null;
  codeSubmitResult: CodeSubmitResult | null;
  matchId: number | null;
}

interface User {
  // 根据你的应用需求定义用户的属性
  id: number;
  name: string;
  email: string;
  lastLoginDate: Date;
  // ...其他属性
}

interface CodingProblem {
  problemID: number;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  difficultyLevel: string;
  addBy: string;
  id: number;
}

interface CodeSubmitResult {
  result: string;
  ifwin: string;
  runTime: string;
  memoryUse: string;
}

// 2. 创建并导出store
export default createStore<State>({
  state: {
    user: null,
    codingProblem: null,
    codeSubmitResult: null,
    matchId: null,
  },
  mutations: {
    SET_USER(state, user: User) {
      state.user = user;
    },
    SET_CODING_PROBLEM(state, problem: CodingProblem) {  // 新增mutation来设置codingProblem
      state.codingProblem = problem;
    },
    SET_CODE_SUBMIT_RESULT(state, result: CodeSubmitResult) {  // 新增mutation来设置codeSubmitResult
      state.codeSubmitResult = result;
    },
    SET_MATCH_ID(state, matchId: number) {  // 新增mutation来设置matchId
      state.matchId = matchId;
    }
  },
  actions: {
    loginUser({ commit }, userInfo: User) {
      // 登录逻辑
      commit('SET_USER', userInfo);
            localStorage.setItem('id', userInfo.id.toString());
      localStorage.setItem('name', userInfo.name.toString());
      console.log('登录成功');
    }

  
  },
  getters: {
    isUserLoggedIn: (state) => {
      return state.user !== null;
    },
    currentCodingProblem: (state) => {  // 新增getter来获取当前的codingProblem
      return state.codingProblem;
    },
    currentCodeSubmitResult: (state) => {  // 新增getter来获取当前的codeSubmitResult
      return state.codeSubmitResult;
    },
    currentMatchId: (state) => {  // 新增getter来获取当前的matchId
      return state.matchId;
    }
  }
});
