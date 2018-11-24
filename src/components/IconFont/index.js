import React, { Component } from 'react';
import '../../assets/css/fonts.css';

export default class IconFont extends Component {
  render() {
    const { type } = this.props;
    return (
      <i className={type} style={{ verticalAlign: 'text-bottom' }} />
    );
  }
}
