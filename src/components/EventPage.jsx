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
    let eventArr = this.props.eventData;
    for (let i = 0; i < eventArr.length; i++) {
      for (const key in eventArr[i]) {
        if (key === 'time') {
          timeTemp.push(eventArr[i][key])
        } else if (key === 'event') {
          eventTemp.push(eventArr[i][key])
        }
      }
      timeTemp.push(eventTemp)
      times.push(timeTemp);
      timeTemp = [];
      eventTemp = [];
    }
    times.sort();
    console.log(times);

    const eventList = [];
    for (let i = 0; i < times.length; i++) {
      eventList.push(<button className="eventTimes" delete={times[i][1]} onClick={() => {this.props.eventDeletor(times[i][1])}}>{times[i][0]}<hr />{times[i][1]}</button>)
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