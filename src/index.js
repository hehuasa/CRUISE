import React from 'react';
import App from './App';
// import { render } from 'react-dom';
//
// render(<Greeter />, document.querySelector('#root'));
import dva from 'dva';
import '@babel/polyfill';
// 创建应用
const app = dva();

// 注册 Model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1; },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
});

// 注册视图
app.router(require('./router').default);

// 启动应用
app.start('#root');
