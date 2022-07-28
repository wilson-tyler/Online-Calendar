import React, { Component } from 'react';
import EventCreate from './EventCreate.jsx';
import EventDelete from './EventDelete.jsx';

export default class Events extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let times = [];
    let timeTemp = [];
    let eventTemp = [];
    let number;
    let eventArr = this.props.eventData;
    for (let i = 0; i < eventArr.length; i++) {
      for (const key in eventArr[i]) {
        if (key === 'time') {
          timeTemp.push(eventArr[i][key])
        } else if (key === 'event') {
          eventTemp.unshift(eventArr[i][key])
        } else if (key === '_id') {
          eventTemp.push(eventArr[i][key]);
        }
      
      if (eventArr[i][key] === '12:00AM') number = 100;
      else if (eventArr[i][key] === '1:00AM') number = 101;
      else if (eventArr[i][key] === '2:00AM') number = 102;
      else if (eventArr[i][key] === '3:00AM') number = 103;
      else if (eventArr[i][key] === '4:00AM') number = 104;
      else if (eventArr[i][key] === '5:00AM') number = 105;
      else if (eventArr[i][key] === '6:00AM') number = 106;
      else if (eventArr[i][key] === '7:00AM') number = 107;
      else if (eventArr[i][key] === '8:00AM') number = 108;
      else if (eventArr[i][key] === '9:00AM') number = 109;
      else if (eventArr[i][key] === '10:00AM') number = 110;
      else if (eventArr[i][key] === '11:00AM') number = 111;
      else if (eventArr[i][key] === '12:00PM') number = 112;
      else if (eventArr[i][key] === '1:00PM') number = 113;
      else if (eventArr[i][key] === '2:00PM') number = 114;
      else if (eventArr[i][key] === '3:00PM') number = 115;
      else if (eventArr[i][key] === '4:00PM') number = 116;
      else if (eventArr[i][key] === '5:00PM') number = 117;
      else if (eventArr[i][key] === '6:00PM') number = 118;
      else if (eventArr[i][key] === '7:00PM') number = 119;
      else if (eventArr[i][key] === '8:00PM') number = 120;
      else if (eventArr[i][key] === '9:00PM') number = 121;
      else if (eventArr[i][key] === '10:00PM') number = 122;
      else if (eventArr[i][key] === '11:00PM') number = 123;
      }
      if (number >=0) timeTemp.unshift(number);
      timeTemp.push(eventTemp);
      times.push(timeTemp);
      timeTemp = [];
      eventTemp = [];
      number = null;
    }
    times.sort();

    const eventList = [];
    for (let i = 0; i < times.length; i++) {
      eventList.push(<button className="eventTimes" eventid={times[i][1][1]} delete={times[i][1]} onClick={() => {this.props.eventDeletor(times[i][2][0], times[i][2][1])}}>{times[i][1]}<hr />{times[i][2][0]}</button>)
    }
    return (
      <div className='eventsPage'>
        {this.props.currentMonth} {this.props.date} Events
          {eventList}
          <button id='monthView' onClick={() => {this.props.loadMonth(this.props.currentMonth, this.props.date + 12)}}>Back to month view</button>
          <button id='createEvent' onClick={this.props.eventCreator}>Create event</button>
        </div>
    )
  }
}