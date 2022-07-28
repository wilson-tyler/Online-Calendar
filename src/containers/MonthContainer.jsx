import React, { Component, useEffect } from 'react';
import Month from '../components/Month.jsx';
import MonthPage from '../components/MonthPage.jsx'
import Events from '../components/EventPage.jsx';
import EventCreate from '../components/EventCreate.jsx';
import EventDelete from '../components/EventDelete.jsx';

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
      currentEvent: null,
      createEvent: false,
      deleteEvent: false,
      date: null
    };
    this.loadMonth = this.loadMonth.bind(this);
    this.fetchMonth = this.fetchMonth.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.eventCreator = this.eventCreator.bind(this);
    this.eventDeletor = this.eventDeletor.bind(this);
    this.postEvent = this.postEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  fetchMonth(month, monthId) {
    console.log('here')
    fetch(`http://localhost:5050/month/${month}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ ...this.state, [monthId]: data, eventsClicked: false});
    })
  }

  fetchEvents(month, id) {
    fetch(`http://localhost:5050/month/${month}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, eventsClicked: true, currentDay: data, date: id, deleteEvent: false});
    })
  }

  loadMonth(monthName) {
    console.log('yes')
    if (this.state.clicked === false) {
      this.setState({ ...this.state, clicked: true, current: monthName })
    } else {
      console.log('it was true')
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

  eventDeletor(event) {
    if (this.state.deleteEvent === false) {
      console.log('DELETE')
      console.log(event[0])
      this.setState({ ...this.state, deleteEvent: true, currentEvent: event[0] })
    } else {
      this.setState({ ...this.state, deleteEvent: false, currentEvent: null })
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

  deleteEvent(eventToDelete) {
    console.log(eventToDelete)
    console.log(this.state.current)
    console.log(this.state.date)
    fetch(`http://localhost:5050/month/${this.state.current}/${this.state.date}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({event: eventToDelete})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let newEvents = this.state.currentDay
      for (let i = 0; i < newEvents.length; i++) {
        if(newEvents[i].event === eventToDelete) {
          newEvents.splice(i, 1);
          break;
        }
      }
      console.log('newEvents', newEvents)
      this.setState({...this.state, deleteEvent: false, currentDay: newEvents, currentEvent: null})
    })
  }

  render() {
    const months = [];
    let monthPage;
    let currentEvents;
    let eventCreation;
    let eventDeletion;
    if (this.state.deleteEvent === true) {
      eventDeletion = <EventDelete deleteEvent={this.deleteEvent} fetchEvents={this.fetchEvents} currentMonth={this.state.current} date={this.state.date} currentEvent={this.state.currentEvent}/>
    } else if (this.state.createEvent === true) {
      eventCreation = <EventCreate postEvent={this.postEvent} currentMonth={this.state.current} date={this.state.date}/>
    } else if (this.state.eventsClicked === true) {
      currentEvents = <Events eventData={this.state.currentDay} eventCreator={this.eventCreator} eventDeletor={this.eventDeletor} loadMonth={this.fetchMonth} date={this.state.date} currentMonth={this.state.current} currentDay={this.state.currentDay}/>
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
        {this.state.deleteEvent && <div>{eventDeletion}</div>}
      </div>
    )
  }
}