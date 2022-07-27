import React, { Component } from 'react';

export default class MonthPage extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    

    return(
      <div>
        {this.props.month}
      </div>
    )
  }
}