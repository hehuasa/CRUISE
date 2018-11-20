import React, { Component } from 'react';
import { Route, Switch, Router } from 'dva/router';
import { menuData } from '../../common/menu';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Sidebar menuData={menuData} />
          <Switch>
            {
              getRoutes(match.path, routerData).map(item =>
                (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                )
              )
            }
          </Switch>
        </div>
      </div>
    );
  }
}
