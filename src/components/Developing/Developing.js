import React, { PureComponent } from 'react';
import { Skeleton, Row, Col } from 'antd';

export default class Developing extends PureComponent {
  render() {
    return (
      <div style={{ width: 'calc(100% - 270px)', float: 'left' }}>
        <Row>
          <Col gutter={1} span={20}>
            <h2 style={{ textAlign: 'center', margin: 40 }}>developing。。。。。。</h2>
            <Skeleton avatar paragraph={{ rows: 4 }} active />
            <Skeleton avatar paragraph={{ rows: 4 }} active />
          </Col>
        </Row>
      </div>
    );
  }
}
