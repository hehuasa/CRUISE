import React, { PureComponent } from 'react';
import IconFont from '../../../components/IconFont';
import Box from './Box';
import styles from './index.less';

export default class Content extends PureComponent {
    state = {
      activeIndex: 0, // defaultState
      addIndex: null,
      resourceValue: '',
      tabsType: 'horizontal',
    };
    componentWillReceiveProps(nextProps) {
      const { showPopup } = this.props;
      if (nextProps.showPopup !== showPopup && !nextProps.showPopup) {
        this.setState({
          resourceValue: '',
          addIndex: null,
        });
      }
    }
    handleSwitch = (index) => {
      this.setState({
        activeIndex: index,
      });
    };
    handleAdd = (index, e) => {
      const { changePopupShow } = this.props;
      this.setState({
        addIndex: index,
      });
      changePopupShow(true);
      e.stopPropagation();
    };
    handleResourceValue = (e) => {
      const { value } = e.target;
      this.setState({
        resourceValue: value,
      });
    };
    handleResourceAdd = (data) => {
      const { dispatch, changePopupShow } = this.props;
      const newData = { ...data };
      const { resources, id } = newData;
      const { resourceValue } = this.state;
      let addRes;
      if (resourceValue.indexOf('，') !== -1) {
        addRes = resourceValue.split('，');
      } else {
        addRes = resourceValue.split(',');
      }

      for (const item of addRes) {
        item.replace(/^\s+|\s+$/g, ''); // del the emptySpace of the string(front and end)
      }
      resources.push(...addRes);
      newData.resources = Array.from(new Set(resources)); // de-duplication
      dispatch({
        type: 'agent/editAgent',
        payload: { id, params: newData },
      }).then(() => {
        dispatch({
          type: 'agent/fetch',
        }).then(() => {
          changePopupShow(false);
        });
      });
    };
    handleDelRes = (data, resource, e) => {
      const { dispatch } = this.props;
      const newData = { ...data };
      const { resources, id } = newData;
      const index = resources.findIndex(value => value === resource);
      resources.splice(index, 1);
      dispatch({
        type: 'agent/editAgent',
        payload: { id, params: newData },
      }).then(() => {
        dispatch({
          type: 'agent/fetch',
        });
      });
      e.stopPropagation();
    };
    render() {
      const { data, showPopup, changePopupShow } = this.props;
      const { activeIndex, addIndex, resourceValue, tabsType } = this.state;
      return (
        <div className={styles.tabs}>
          <div className={styles.bar}>
            <div className={styles['tabs-nav-container']}>
              { data.map((item, index) => (
                <div key={item.type} className={index === activeIndex ? styles.active : ''} onClick={() => this.handleSwitch(index)}>
                  {item.name}
                </div>
                    ))}
            </div>
            <div className={styles.extra}>
              <div className={styles.search}>
                <IconFont type="icon-search" />
                <input />
              </div>
              <div className={styles.btn}>
                <IconFont style={{ color: tabsType === 'vertical' ? '#00b4cf' : '' }} type="icon-th-card" />
                <IconFont style={{ color: tabsType === 'horizontal' ? '#00b4cf' : '' }} type="icon-th-list" />
              </div>
            </div>
          </div>
          <div className={styles['tabs-content-container']} style={{ marginLeft: `-${100 * activeIndex}%` }}>
            { data.map((item, index) => (
              <div key={item.type} style={{ opacity: activeIndex === index ? 1 : 0, height: activeIndex === index ? 'auto' : 0 }}>
                { item.data.map((item1, index1) => (
                  <Box
                    data={item1}
                    key={item1.id}
                    sortIndex={index1}
                    addIndex={addIndex}
                    showPopup={showPopup}
                    handleAdd={this.handleAdd}
                    handleDelRes={this.handleDelRes}
                    changePopupShow={changePopupShow}
                    handleResourceValue={this.handleResourceValue}
                    handleResourceAdd={this.handleResourceAdd}
                    resourceValue={resourceValue}
                  />
))}

              </div>
))}
          </div>
        </div>
      );
    }
}
