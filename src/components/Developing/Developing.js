import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Skeleton, Row, Col, Button } from 'antd';
import Mark from '../Mark/Mark';
import MarkRender from '../Mark/MarkRender';

@connect(({ mark }) => {
  const { data, markShow } = mark;
  return {
    markShow,
    data,
  };
})
export default class Developing extends PureComponent {
    handleSwitch = () => {
      const { dispatch, markShow } = this.props;
      dispatch({
        type: 'mark/queryMarkShow',
        payload: !markShow,
      });
    };
    render() {
      const { markShow, data, dispatch } = this.props;
      return (
        <div style={{ width: 930, float: 'left', paddingLeft: 29, position: 'relative', height: '100%' }}>
          <Button htmlType="button" onClick={this.handleSwitch} style={{ zIndex: 3 }}> Switch</Button>
          {/* <Row> */}
          {/* <Col gutter={1} span={20}> */}
          {/* <h2 style={{ textAlign: 'center', margin: 40 }}>developing。。。。。。</h2> */}
          {/* <Skeleton avatar paragraph={{ rows: 4 }} active /> */}
          {/* <Skeleton avatar paragraph={{ rows: 4 }} active /> */}
          {/* </Col> */}
          {/* </Row> */}

          { markShow ? <Mark dispatch={dispatch} data={data} /> : null }
          { !markShow ? data.map((node) => {
                return <MarkRender key={node.id} data={node} />;
            }) : null }
        </div>
      );
    }
}
