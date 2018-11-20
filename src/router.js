import React from 'react';
import { Route, Switch, Router } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route
            path="/app"
            component={BasicLayout}
          />
          <Route
            path="/"
            render={props => <BasicLayout {...props} />}
            redirectPath="/app"
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
