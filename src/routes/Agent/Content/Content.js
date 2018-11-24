import React, { PureComponent } from 'react';
import IconFont from '../../../components/IconFont';
import windows from '../../../assets/img/os/windows.png';
import ubuntu from '../../../assets/img/os/ubuntu.png';
import debian from '../../../assets/img/os/debin.png';
import suse from '../../../assets/img/os/suse.png';
import centos from '../../../assets/img/os/cent_os.png';
import styles from './index.less';

const osLogo = { windows, ubuntu, debian, suse, centos };

export default class Content extends PureComponent {
    state = {
      activeIndex: 0, // defaultState
    };
    handleClick = (index) => {
      this.setState({
        activeIndex: index,
      });
    };
    render() {
      const { data } = this.props;
      const { activeIndex } = this.state;
      return (
        <div className={styles.tabs}>
          <div className={styles.bar}>
            <div className={styles['tabs-nav-container']}>
              { data.map((item, index) => (
                <div key={item.type} className={index === activeIndex ? styles.active : ''} onClick={() => this.handleClick(index)}>
                  {item.name}
                </div>
                    ))}
            </div>
            <div className={styles.extra}>
              <div className={styles.search}>
                <IconFont type="icon-search" />
                <input />
              </div>
              <div className={styles.btn}>
                <IconFont type="icon-th-card" />
                <IconFont type="icon-th-list" />
              </div>
            </div>
          </div>
          <div className={styles['tabs-content-container']} style={{ marginLeft: `-${100 * activeIndex}%` }}>
            { data.map((item, index) => (
              <div key={item.type} style={{ opacity: activeIndex === index ? 1 : 0, height: activeIndex === index ? 'auto' : 0 }}>
                { item.data.map(item1 => (
                  <div className={styles.box} key={Math.random() * new Date().getTime()}>
                    <div className={styles.logo}>
                      <img src={osLogo[item1.os]} alt={item1.os} />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.info}>
                        <div className={styles.name}>
                          <IconFont type="icon-desktop" />
                          <span>{item1.name}</span>
                        </div>
                        <div className={styles[item1.status]}>{item1.status}</div>
                        <div>
                          <IconFont type="icon-info" />
                          <span>{item1.ip}</span>
                        </div>
                        <div>
                          <IconFont type="icon-folder" />
                          <span>{item1.location}</span>
                        </div>
                      </div>
                      <div className={styles.tools}>
                          <div className={styles.left}>
                              <div className={styles.add}>
                                  <IconFont type="icon-plus" />
                              </div>
                              <div className={styles.resources}>
                                  {item1.resources.map(value => (
                                      <div key={Math.random() * new Date().getTime()}>
                                          <span>{value}</span>
                                          <IconFont type="icon-trash" />
                                      </div>
                                  ))}
                              </div>
                          </div>
                          <div className={styles.deny}>
                              <IconFont type="icon-trash" />
                              <span>Deny</span>
                          </div>
                      </div>
                    </div>
                  </div>
))}

              </div>
))}
          </div>
        </div>
      );
    }
}
