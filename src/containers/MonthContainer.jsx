import React, { Component } from 'react';
import Month from '../components/Month.jsx';
import MonthPage from '../components/MonthPage.jsx'

export default class MonthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
      month1: false,
      month2: false,
      month3: false,
      month4: false,
      month5: false,
      month6: false,
      month7: false,
      month8: false,
      month9: false,
      month10: false,
      month11: false,
      month12: false,
      clicked: false,
      current: null
    };
    this.loadMonth = this.loadMonth.bind(this);
  }

  loadMonth(monthName) {
    if (this.state.clicked === false) {
      this.setState({ ...this.state, clicked: true, current: monthName})
    } else {
    this.setState({ ...this.state, clicked: false, current: null})
    }
  }

  render() {
    const months = [];
    let monthPage;
    if (this.state.clicked === false) {
      console.log('hello')
      for (let i = 1; i <= 12; i++) {
        months.push(<Month month={this.state[i]} loadMonth={this.loadMonth} id={`month${i}`} />);
      }
    } else {
      console.log('goodbye')
      monthPage = <MonthPage month={this.state.current}/>;
    }
  return(
    <div id="monthContainer">
      {months} 
      {this.state.clicked && <div className='monthCard'>{monthPage}</div>}
    </div>
    )
  }
}