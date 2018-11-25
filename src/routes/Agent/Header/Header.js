import React, { PureComponent } from 'React';
import IconFont from '../../../components/IconFont';
import styles from './index.less';

const types = [
  { type: 'ALL' },
  { type: 'PHYSICAL' },
  { type: 'VIRTUAL' },
];
export default class Header extends PureComponent {
  render() {
    const { status } = this.props;
    return (
      <div className={styles.warp}>
        <div className={styles.building}>
          <div className={styles.title}>Building</div>
          <div className={styles.animate}>
            <IconFont type="icon-cog" />
          </div>
          <div className={styles.count}>{status.building}</div>
        </div>
        <div className={styles.idle}>
          <div className={styles.title}>Idle</div>
          <div className={styles.animate}>
            <IconFont type="icon-coffee" />
          </div>
          <div className={styles.count}>{status.idle}</div>
        </div>
        <div className={styles.counting}>
          { types.map(item => (
            <div key={item.type}>
              <div className={styles.type}>{item.type}</div>
              <div className={styles.num}>{status[item.type]}</div>
            </div>
))}
        </div>
      </div>
    );
  }
}
