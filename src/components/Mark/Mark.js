import React, { PureComponent } from 'react';
import G6 from '@antv/g6';
import { registerBehaviour, registerNode } from './register';
import styles from './index.less';

const auxiliaryColor0 = 'rgba(0, 0, 0, 0)';
export default class Mark extends PureComponent {
    state = {
      zIndex: 10,
      isCreate: false,
      createNode: {},

    };
    componentDidMount() {
      const { data } = this.props;
      registerNode(G6);
      registerBehaviour(G6);
      this.graph = new G6.Graph({
        container: this.canvas,
        modes: {
          default: ['drag'],
          edit: ['edit'],
        },
        mode: 'default',
      });
      this.graph.on('mousemove', (ev) => {
        const { isCreate, createNode } = this.state;
        if (isCreate) {
          switch (createNode.type) {
            // 节点
            case 'node1':
              this.graph.add('node', {
                x: ev.x,
                y: ev.y,
                fill: '#202121',
                width: 80,
                height: 80,
                fontSize: 14,
                label: createNode.label,
                auxiliaryColor: auxiliaryColor0,
                shape: 'customNode',
              });
              break;
            default: break;
          }
          this.setState({ isCreate: false });
        }
      });
      this.graph.on('click', (e) => {
        console.log(e);
      });
      this.graph.read({ nodes: data });
    }
    // 新增节点时，获取与存储节点类型
    handleDrag = (e) => {
      e.dataTransfer.setData('label', e.target.innerHTML);
      e.dataTransfer.setData('type', e.target.title);
    };
    // 新增节点拖动至画布时，获取节点类型
    handleDrop = (e) => {
      const label = e.dataTransfer.getData('label');
      const type = e.dataTransfer.getData('type');
      this.setState({ isCreate: true, createNode: { label, type } });
    };
    handleSave = () => {
      const { dispatch } = this.props;
      const data = this.graph.save();
      const { nodes } = data;
      for (const node of nodes) {
        const item = this.graph.find(node.id);
        node.box = item.getBBox();
      }
      dispatch({
        type: 'mark/save',
        payload: nodes,
      });
    };
    render() {
      const { zIndex } = this.state;
      return (
        <div className={styles.warp} style={{ zIndex }}>
          <div className={styles.tools} onDragStart={this.handleDrag}>
            <div draggable title="node1">node1</div>
            <div draggable title="node2">node2</div>
            <div draggable title="node3">node3</div>
            <div draggable title="node4">node4</div>
            <div onClick={this.handleSave}>保存</div>
          </div>
          <div className={styles.canvas} ref={(ref) => { this.canvas = ref; }} onDragEnter={event => event.preventDefault()} onDragOver={event => event.preventDefault()} onDrop={this.handleDrop} />
        </div>
      );
    }
}
