import React, { Component } from 'react';

export default class Month extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <button className='btn'>{this.props.month}</button>
    )
  }
}