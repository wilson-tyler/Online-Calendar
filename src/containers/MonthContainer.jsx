import React, { Component } from 'react';
import Month from '../components/Month.jsx';

export default class MonthContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      1: 'JANUARY',
      2: 'FEBRUARY',
      3: 'MARCH',
      4: 'APRIL',
      5: 'MAY',
      6: 'JUNE',
      7: 'JULY',
      8: 'AUGUST',
      9: 'SEPTEMBER',
      10: 'OCTOBER',
      11: 'NOVEMBER',
      12: 'DECEMBER'
    };
  }
  render() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(<Month month={this.state[i]} key={`Month ${i}`}/>);
    }
    return (
      <div id="monthContainer">
        {months}
      </div>
    )
  }
}