import React, { PureComponent } from 'React';
import IconFont from '../../../components/IconFont';
import styles from './index.less';

const types = [
  { type: 'ALL', num: 8 },
  { type: 'PHYSICAL', num: 4 },
  { type: 'VIRTUAL', num: 4 },
];
export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.warp}>
        <div className={styles.building}>
          <div className={styles.title}>Building</div>
          <div className={styles.animate}>
            <IconFont type="icon-cog" />
          </div>
          <div className={styles.count}>3</div>
        </div>
        <div className={styles.idle}>
          <div className={styles.title}>Idle</div>
          <div className={styles.animate}>
            <IconFont type="icon-coffee" />
          </div>
          <div className={styles.count}>5</div>
        </div>
        <div className={styles.counting}>
          { types.map(item => (
            <div key={item.type}>
              <div className={styles.type}>{item.type}</div>
              <div className={styles.num}>{item.num}</div>
            </div>
))}
        </div>
      </div>
    );
  }
}
