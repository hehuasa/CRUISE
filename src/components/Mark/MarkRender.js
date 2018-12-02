import React, { PureComponent } from 'react';
import G6 from '@antv/g6';
import { registerBehaviour, registerNode } from './register';
import styles from './index.less';


export default class MarkRender extends PureComponent {
  componentDidMount() {
    const { data } = this.props;
      const { box } = data;
    console.log('data3', data);
    registerNode(G6);
    registerBehaviour(G6);
    const graph = new G6.Graph({
      container: this.canvas,
    });
    const newData = { ...data };
    newData.x = 0;
    newData.y = 0;
    graph.read({ nodes: [newData] });
  }
  render() {
    const { data } = this.props;
    console.log('data3', data);
    const { box } = data;
    const { width, height, minX, minY } = box;
    const style = {
      top: minY,
      left: minX,
      width,
      height,
    };
    return (
      <div className={styles.renderWarp} style={style} >
        <div className={styles.canvas} ref={(ref) => { this.canvas = ref; }} />
      </div>
    );
  }
}
