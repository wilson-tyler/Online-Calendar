import React, { Component } from 'react';

export default class Month extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <button className='monthBtn' key={this.props.key}>{this.props.month}</button>
    )
  }
}