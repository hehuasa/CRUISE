import React, { Component } from 'react';
import { Route } from 'dva/router';
import { menuData } from '../../common/menu';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import styles from './index.less';

export default class HomePage extends Component {
    state = {
      showPopup: false,
    };
    componentDidMount() {
      if (this.props.location.pathname === '/') {
        this.props.history.push('/homePage/agent');
      }
    }
  changePopupShow = (param) => {
    this.setState({
      showPopup: param,
    });
  };
  render() {
    const { routerData } = this.props;
    const { showPopup } = this.state;
    const homePageChildren = menuData.find(value => value.path === 'homePage').children || [];
    const children = homePageChildren.map((item) => {
      const path = `/${item.path}`;
      const route = routerData[path];
      return route ? (
        <Route
          key={item.path}
          path={path}
          render={props => (
            <route.component
              {...props}
              showPopup={showPopup}
              changePopupShow={this.changePopupShow}
            />
)}

          exact
        />
      ) : null;
    }
    );
    return (
      <div className={styles.warp} onClick={() => this.setState({ showPopup: false })}>
        <Header />
        <div className={styles.content}>
          <Sidebar menuData={menuData} />
          { children }
        </div>
        <footer>@Copyright 2017 ThoughtWorks</footer>
      </div>
    );
  }
}
