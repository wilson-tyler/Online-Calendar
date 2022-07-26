import React, { Component } from 'react';
import Month from '../components/Month.jsx';

export default class MonthContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      0: 'JANUARY',
      1: 'FEBRUARY',
      2: 'MARCH',
      3: 'APRIL',
      4: 'MAY',
      5: 'JUNE',
      6: 'JULY',
      7: 'AUGUST',
      8: 'SEPTEMBER',
      9: 'OCTOBER',
      10: 'NOVEMBER',
      11: 'DECEMBER'
    };
  }
  render() {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(<Month month={this.state[i]} key={`Month ${i}`}/>);
    }
    return (
      <div id="monthContainer">
        {months}
      </div>
    )
  }
}