import React, { PureComponent } from 'react';
import styles from './index.less';
import IconFont from '../../../components/IconFont';

export default class Modal extends PureComponent {
  render() {
    const {
      data,
      handleResourceValue,
      resourceValue,
      changePopupShow,
      handleResourceAdd,
    } = this.props;
    return (
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.triangle} />
        <div className={styles['modal-content']}>
          <div className={styles.title}>
                        Separate multiple resource name with commas
          </div>
          <div className={styles.close} onClick={() => changePopupShow(false)}>
            <IconFont type="icon-close" />
          </div>
          <input type="text" value={resourceValue} onChange={handleResourceValue} />
          <div
            onClick={() => handleResourceAdd(data)}
            className={styles.add}
          >Add Resources
          </div>
          <div className={styles.cancel} onClick={() => changePopupShow(false)}>Cancel</div>
        </div>
      </div>
    );
  }
}
