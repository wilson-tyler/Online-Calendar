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
      eventList.push(<div className="eventTimes">{times[i][0]}<hr />{times[i][1]}</div>)
    }
    return (
          <div className='eventsPage'>
            Today's Events

          {eventList}
          <button id='createEvent' onClick={this.props.eventCreator}>Create event</button>
          <button id='deleteEvent' onClick={console.log('hello')}>Delete event</button>
        </div>
    )
  }
}