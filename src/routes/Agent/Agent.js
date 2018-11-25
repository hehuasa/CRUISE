import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Header from './Header/Header';
import Content from './Content/Content';
import styles from './index.less';

@connect(({ agent }) => {
  const { sortedData, status } = agent;
  return {
    sortedData,
    status,
  };
}
)
export default class Agent extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agent/fetch',
    });
  }
  render() {
    const { sortedData, status, dispatch, changePopupShow, showPopup } = this.props;
    return (
      <div className={styles.warp}>
        <Header status={status} />
        <Content
          data={sortedData}
          dispatch={dispatch}
          changePopupShow={changePopupShow}
          showPopup={showPopup}
        />
      </div>
    );
  }
}
