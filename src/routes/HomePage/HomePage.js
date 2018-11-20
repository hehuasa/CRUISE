import React, { Component } from 'react';
import { Route, Switch, Router } from 'dva/router';
import { getRouterData } from '../../common/router';
import { menuData } from '../../common/menu';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

export default class HomePage extends Component {
  render() {
    const { routerData } = this.props;
    const homePageChildren = menuData.find(value => value.path === 'homePage').children || [];
    const children = homePageChildren.map((item) => {
      const path = `/${item.path}`;
      const route = routerData[path];
      return route ? (
        <Route
          key={item.path}
          path={path}
          component={route.component}
          exact
        />
      ) : null;
    }
    );
    return (
      <div>
        <Header />
        <div>
          <Sidebar menuData={menuData} />
          { routerData ? (
            <Switch>
              { children }
            </Switch>
) : null }
        </div>
      </div>
    );
  }
}
