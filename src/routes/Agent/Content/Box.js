import React, { PureComponent } from 'react';
import IconFont from '../../../components/IconFont';
import Modal from './Modal';
import styles from './index.less';
import windows from '../../../assets/img/os/windows.png';
import ubuntu from '../../../assets/img/os/ubuntu.png';
import debian from '../../../assets/img/os/debin.png';
import suse from '../../../assets/img/os/suse.png';
import centos from '../../../assets/img/os/cent_os.png';

const osLogo = { windows, ubuntu, debian, suse, centos };
export default class Box extends PureComponent {
  render() {
    const {
      data,
      sortIndex,
      addIndex,
      handleAdd,
      showPopup,
      handleDelRes,
        changePopupShow,
      handleResourceValue,
      resourceValue,
      handleResourceAdd,
    } = this.props;
    return (
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={osLogo[data.os]} alt={data.os} />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.name}>
              <IconFont type="icon-desktop" />
              <span>{data.name}</span>
            </div>
            <div className={styles[data.status]}>{data.status}</div>
            <div>
              <IconFont type="icon-info" />
              <span>{data.ip}</span>
            </div>
            <div>
              <IconFont type="icon-folder" />
              <span>{data.location}</span>
            </div>
          </div>
          <div className={styles.tools}>
            <div className={styles.left}>
              <div className={styles.add}>
                <div className={styles.btn} onClick={e => handleAdd(sortIndex, e)} >
                  <IconFont type="icon-plus" />
                </div>
                { addIndex === sortIndex && showPopup ? (
                    <Modal data={data} resourceValue={resourceValue} handleResourceValue={handleResourceValue} handleResourceAdd={handleResourceAdd} changePopupShow={changePopupShow} />
                      ) : null }


              </div>
              <div className={styles.resources}>
                {data.resources.map(value => (
                  <div key={Math.random() * new Date().getTime()}>
                    <span>{value}</span>
                    <span onClick={() => handleDelRes(data, value)}><IconFont type="icon-trash" /></span>
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
    );
  }
}
