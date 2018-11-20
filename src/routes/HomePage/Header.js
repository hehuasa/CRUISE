import React, { Component } from 'react';
import IconFont from '../../components/IconFont';
import styles from './index.less';
import logo from '../../assets/img/header/logo.svg';
import user from '../../assets/img/header/user.png';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.user}>
            <div className={styles.img}>
              <img src={user} alt="user" />
            </div>
            <span className={styles.up}><IconFont type="icon-angle-up" /></span>
            <span className={styles.down}><IconFont type="icon-angle-down" /></span>
            <div className={styles.menu}>
              <div className={styles.first}>
                <IconFont type="icon-id-card" />
                <span>Profile</span>
              </div>
              <div className={styles.second}>
                <IconFont type="icon-sign-in" />
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
