
import dva from 'dva';
import '@babel/polyfill';
// 创建应用
const app = dva();

// 注册视图
app.router(require('./router').default);

// 启动应用
app.start('#root');
