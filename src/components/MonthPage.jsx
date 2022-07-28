import React, { Component } from 'react';

export default class MonthPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFunc(this.props.month, this.props.id);
  }
// this.props.dateArrs
  render() {
    const buttons = [];
    let done = false;
    const monthObj = this.props.dateArrs[0];
    console.log(monthObj)
    if (monthObj !== 'F' && monthObj !== 'J' && monthObj !== 'M' && monthObj !== 'A' && monthObj !== 'S' && monthObj !== 'O' && monthObj !== 'N' && monthObj !== 'D') {
    if (this.props.month === 'January' || this.props.month === 'March' || this.props.month === 'May' || this.props.month === 'July' || this.props.month === 'August' || this.props.month === 'October' || this.props.month === 'December') {
      for (let i = 1; i < 32; i++) {
        if ((this.props.month === 'January' || this.props.month === 'October') && done === false) {
          for (let i = 0; i < 6; i++) {
            buttons.push(<div></div>)
          }
        } else if (this.props.month === 'March' && done === false) {
          for (let i = 0; i < 2; i++) {
            buttons.push(<div></div>)
          }
        } else if (this.props.month === 'July' && done === false) {
          for (let i = 0; i < 5; i++) {
            buttons.push(<div></div>)
          }
        } else if (this.props.month === 'August' && done === false) {
          for (let i = 0; i < 1; i++) {
            buttons.push(<div></div>)
          }
        } else if (this.props.month === 'December' && done === false) {
          for (let i = 0; i < 4; i++) {
            buttons.push(<div></div>)
          }
        }
        done = true;
        if (monthObj[i].length > 0) {
          buttons.push(<button className='hasEvent' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
        } else {
          buttons.push(<button className='dateButton' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
        }
      }
        } else if (this.props.month === 'April' || this.props.month === 'June' || this.props.month === 'September' || this.props.month === 'November') {
          for (let i = 1; i < 31; i++) {
            if (this.props.month === 'April' && done === false) {
              for (let i = 0; i < 5; i++) {
                buttons.push(<div></div>)
              }
            } else if (this.props.month === 'June' && done === false) {
              for (let i = 0; i < 3; i++) {
                buttons.push(<div></div>)
              }
            } else if (this.props.month === 'September' && done === false) {
              for (let i = 0; i < 4; i++) {
                buttons.push(<div></div>)
              }
            } else if (this.props.month === 'November' && done === false) {
              for (let i = 0; i < 2; i++) {
                buttons.push(<div></div>)
              }
            }
            done = true;
            if (monthObj[i].length > 0) {
              buttons.push(<button className='hasEvent' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
            } else {
              buttons.push(<button className='dateButton' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
            }
          }
        } else if (this.props.month === 'February') {
          for (let i = 1; i < 29; i++) {
            if (done === false) {
              for (let i = 0; i < 2; i++) {
                buttons.push(<div></div>)
              }
            }
            done = true;
            if (monthObj[i].length > 0) {
              buttons.push(<button className='hasEvent' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
            } else {
              buttons.push(<button className='dateButton' onClick={() => this.props.fetchEventFunc(this.props.month, i)}>{i}</button>)
            }
          }
        }
      }
      return (
        <div>
            <div id='monthCard'>
            <div>SUN</div>
            <div>MON</div>
            <div>TUES</div>
            <div>WED</div>
            <div>THURS</div>
            <div>FRI</div>
            <div>SAT</div>

            {buttons}
            <button id="backMonth" onClick={() => this.props.returnYear(null)}>Return to year view</button>
          </div>
        </div>
      )
    }
  }