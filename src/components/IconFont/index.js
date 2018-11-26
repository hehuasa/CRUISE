import React, { Component } from 'react';
import '../../assets/css/fonts.css';

export default class IconFont extends Component {
  render() {
    const { type, style } = this.props;
    return (
      <i className={type} style={style} />
    );
  }
}
