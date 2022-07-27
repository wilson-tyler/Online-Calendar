import React, { Component } from 'react';

export default class Month extends Component{
  constructor(props) {
    super(props);
  }
  render() {

    return(
         <button className='monthBtn' key={this.props.key} onClick={() => this.props.loadMonth(this.props.month)}>
           {this.props.month}
         </button>
    )
  }
}