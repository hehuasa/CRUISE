import React, { Component } from 'react';
import { Link } from 'dva/router';
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
              <Link to={`/${item.path}`}>{item.name}</Link>
            </li>
))}
        </ul>
      </div>
    );
  }
}
