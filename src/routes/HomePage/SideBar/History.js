import React, { Component } from 'react';
import styles from './index.less';

const createFakeList = () => {
  const name = 'bjstdmngbdr';
  const location = '/Acceptance_test';
  const nums = 15;
  let index = 0;
  const array = [];
  while (index < nums) {
    const sort = index < 10 ? `0${index}` : index;
    array.push({
      id: index,
      name: `${name}${sort}${location}`,
    });
    index += 1;
  }
  return array;
};
export default class History extends Component {
  constructor() {
    super();
    this.state = {
      list: createFakeList(),
    };
  }
  render() {
    const { list } = this.state;
    return (
      <div className={styles.history}>
        <div className={styles.title}>
          History
        </div>
        <ul className={styles.list} >
          {list.map(item =>
            <li key={item.id}>{item.name}</li>
            )}
        </ul>
      </div>
    );
  }
}
