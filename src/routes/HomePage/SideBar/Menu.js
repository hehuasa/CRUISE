import React, { Component } from 'react';
import { NavLink } from 'dva/router';
import IconFont from '../../../components/IconFont';
import styles from './index.less';

export default class Menu extends Component {
  render() {
    const { menuData } = this.props;
    const lists = menuData.find(value => value.path === 'homePage').children;
    return (
      <div>
        <ul className={styles.menu}>
          { lists.map(item => (
            <li key={item.name}>
              <NavLink to={`/${item.path}`} activeClassName={styles['menu-hover']} ><IconFont type={item.icon} style={{ fontSize: 24 }} />{item.name}</NavLink>
            </li>
))}
        </ul>
      </div>
    );
  }
}
