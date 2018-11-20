import React, { Component } from 'react';
import Menu from './Menu';
import History from './History';
import styles from './index.less';

export default class Sidebar extends Component {
  render() {
    const { menuData } = this.props;
    return (
      <div className={styles.warp}>
        <Menu menuData={menuData} />
        <History />
      </div>
    );
  }
}
