import React, { Component, useEffect } from 'react';
import Month from '../components/Month.jsx';
import MonthPage from '../components/MonthPage.jsx'
import Events from '../components/EventPage.jsx';
import EventCreate from '../components/EventCreate.jsx';

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
      13: 'January',
      14: 'February',
      15: 'March',
      16: 'April',
      17: 'May',
      18: 'June',
      19: 'July',
      20: 'August',
      21: 'September',
      22: 'October',
      23: 'November',
      24: 'December',
      clicked: false,
      eventsClicked: false,
      current: null,
      currentDay: null,
      createEvent: false,
      date: null
    };
    this.loadMonth = this.loadMonth.bind(this);
    this.fetchMonth = this.fetchMonth.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.eventCreator = this.eventCreator.bind(this);
    this.postEvent = this.postEvent.bind(this);
  }

  fetchMonth(month, monthId) {
    fetch(`http://localhost:5050/month/${month}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ ...this.state, [monthId]: data });
    })
  }

  fetchEvents(month, id) {
    fetch(`http://localhost:5050/month/${month}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, eventsClicked: true, currentDay: data, date: id});
    })
  }

  loadMonth(monthName) {
    if (this.state.clicked === false) {
      this.setState({ ...this.state, clicked: true, current: monthName })
    } else {
      this.setState({ ...this.state, clicked: false, current: null })
    }
  }

  eventCreator() {
    if (this.state.createEvent === false) {
      this.setState({ ...this.state, createEvent: true })
    } else {
      this.setState({ ...this.state, createEvent: false })
    }
  }

  postEvent(event, time, month, day) {
    console.log('event: ', event)
    console.log('time: ', time)
    console.log('month: ', month)
    console.log('date: ', day)
    fetch(`http://localhost:5050/month/${month}/${day}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({event: event, time: time})
    })
    .then(response => response.json())
    .then(data => {
      let newEvents = this.state.currentDay
      newEvents.push({event: event, time: time})
      this.setState({...this.state, createEvent: false, currentDay: newEvents});
    })
  }

  deleteEvent() {
    
  }

  render() {
    const months = [];
    let monthPage;
    let currentEvents;
    let eventCreation;
    if (this.state.createEvent === true) {
      eventCreation = <EventCreate postEvent={this.postEvent} currentMonth={this.state.current} date={this.state.date}/>
    } else if (this.state.eventsClicked === true) {
      currentEvents = <Events eventData={this.state.currentDay} eventCreator={this.eventCreator}/>
    } else if (this.state.clicked === false) {
      for (let i = 1; i <= 12; i++) {
        months.push(<Month month={this.state[i]} loadMonth={this.loadMonth} id={`month${i}`} />);
      }
    } else {
      for (let i = 13; i <= 24; i++) {
        if(Array.isArray(this.state[i]) && this.state.eventsClicked === false) {
          monthPage = <MonthPage fetchFunc={this.fetchMonth} fetchEventFunc={this.fetchEvents} dateArrs={this.state[i]} id={i} month={this.state.current} returnYear={this.loadMonth}/>;
        } else if (this.state.current == this.state[i]) {
          monthPage = <MonthPage fetchFunc={this.fetchMonth} fetchEventFunc={this.fetchEvents} dateArrs={this.state[i]} id={i} month={this.state.current} returnYear={this.loadMonth}/>;
        }
      }
    }
    return (
      <div id="monthContainer">
        {months}
        {this.state.clicked && <div>{monthPage}</div>}
        {this.state.eventsClicked && <div>{currentEvents}</div>}
        {this.state.createEvent && <div>{eventCreation}</div>}
      </div>
    )
  }
}