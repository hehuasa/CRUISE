const auxiliaryColor0 = 'rgba(0, 0, 0, 0)';
const auxiliaryColor1 = 'rgba(255, 255, 255, .8)';

const resgisterAuxiliary = ({ group, rectWidth, rectHeight, auxiliaryColor }) => {
  // 辅助形， 用于辅助改变size
  const size = 8;
  group.addShape('rect', {
    attrs: {
      x: 0 - size / 2,
      y: 0 - size / 2,
      width: size,
      height: size,
      fill: auxiliaryColor,
      stroke: auxiliaryColor,
      isAuxiliary: true,
    },
  });
  group.addShape('rect', {
    attrs: {
      x: 0 + rectWidth - size / 2,
      y: 0 - size / 2,
      width: size,
      height: size,
      fill: auxiliaryColor,
      stroke: auxiliaryColor,
      isAuxiliary: true,
    },
  });
  group.addShape('rect', {
    attrs: {
      x: 0 + rectWidth - size / 2,
      y: 0 + rectHeight - size / 2,
      width: size,
      height: size,
      fill: auxiliaryColor,
      stroke: auxiliaryColor,
      isAuxiliary: true,
    },
  });
  group.addShape('rect', {
    attrs: {
      x: 0 - size / 2,
      y: 0 + rectHeight - size / 2,
      width: size,
      height: size,
      fill: auxiliaryColor,
      stroke: auxiliaryColor,
      isAuxiliary: true,
    },
  });
};
const judge = (x, y, box, model, auxiliarySize) => {
  const { maxX, maxY, minX, minY } = box;
  const obj = [
    { x: [minX - auxiliarySize.x, minX + auxiliarySize.x], y: [minY - auxiliarySize.y, minY + auxiliarySize.y] },
    { x: [maxX - auxiliarySize.x, maxX + auxiliarySize.x], y: [minY - auxiliarySize.y, minY + auxiliarySize.y] },
    { x: [maxX - auxiliarySize.x, maxX + auxiliarySize.x], y: [maxY - auxiliarySize.y, maxY + auxiliarySize.y] },
    { x: [minX - auxiliarySize.x, minX + auxiliarySize.x], y: [maxY - auxiliarySize.y, maxY + auxiliarySize.y] },
  ];
  return obj.find(value => value.x[0] < x && value.x[1] > x && value.y[0] < y && value.y[1] > y);
};
const registerBehaviour = (G6) => {
  // 拖拽行为 drag
  G6.registerBehaviour('drag', (graph) => {
    let node;
    let dx;
    let dy;
    graph.behaviourOn('node:dragstart', (ev) => {
      const { item } = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    graph.behaviourOn('node:drag', (ev) => {
      node && graph.update(node, {
        x: ev.x + dx,
        y: ev.y + dy,
      });
    });
    graph.behaviourOn('node:dragend', () => {
      node = undefined;
    });
  });
  // 编辑行为 edit
  G6.registerBehaviour('edit', (graph) => {
    let isIn;
    const origin = {
      dx: 0,
      dy: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      item: null,
    };
    graph.behaviourOn('node:mouseenter', (ev) => {
      const { item } = ev;
      if (item) {
        const model = item.getModel();
        // 显示辅助锚点（用于resizeNode）
        if (model.auxiliaryColor && model.auxiliaryColor === auxiliaryColor0) {
          graph.update(item, {
            auxiliaryColor: auxiliaryColor1,
          });
        }
      }
    });
    graph.behaviourOn('node:mouseleave', (ev) => {
      const { item } = ev;
      if (item) {
        const model = item.getModel();
        // 显示辅助锚点（用于resizeNode）
        if (model.auxiliaryColor && model.auxiliaryColor === auxiliaryColor1) {
          graph.update(item, {
            auxiliaryColor: auxiliaryColor0,
          });
        }
      }
    });
    graph.behaviourOn('node:dragstart', (ev) => {
      const { item, x, y } = ev;
      if (item) {
        // 判断是否在resizeNode的节点上
        const model = item.getModel();
        const box = item.getBBox();
        isIn = judge(x, y, box, model, { x: 4, y: 4 });
        if (isIn) {
          origin.x = x;
          origin.y = y;
          origin.item = item;
          origin.model = JSON.parse(JSON.stringify(model));
          origin.width = model.width;
          origin.height = model.height;
        }
      }
    });
    graph.behaviourOn('node:drag', (ev) => {
      if (isIn) {
        const { x, y } = ev;
        const { width, height, item, model } = origin;
        const dx = x - origin.x;
        const dy = y - origin.y;
        // 计算增量
        const xV = dx > 0 ? { width: width + dx } : { x: model.x + dx, width: width - dx };
        const yV = dy > 0 ? { height: height + dy } : { y: model.y + dy, height: height - dy };
        graph.update(item, {
          ...xV,
          ...yV,
        });
      }
    });
    graph.behaviourOn('node:dragend', () => {
      isIn = false;
    });
  });
};
const registerNode = (G6) => {
  G6.registerNode('customNode', {
    draw(item) {
      const group = item.getGraphicGroup();
      const model = item.getModel();
      const { width, height, auxiliaryColor } = model;
      // 主要形
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width,
          height,
          fill: 'blue',
          stroke: 'red',
        },
      });
      resgisterAuxiliary({ group, rectWidth: width, rectHeight: height, auxiliaryColor });
      return group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width,
          height,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
        },
      });
    },
  });
};

export { registerBehaviour, registerNode };
