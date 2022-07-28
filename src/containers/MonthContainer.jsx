import React, { Component, useEffect } from 'react';
import Month from '../components/Month.jsx';
import MonthPage from '../components/MonthPage.jsx'
import Events from '../components/EventPage.jsx';
import EventCreate from '../components/EventCreate.jsx';
import EventDelete from '../components/EventDelete.jsx';
import EventUpdate from '../components/EventUpdate.jsx';

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
      currentEventId: null,
      createEvent: false,
      deleteEvent: false,
      updateEvent: false,
      date: null
    };
    this.loadMonth = this.loadMonth.bind(this);
    this.fetchMonth = this.fetchMonth.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.eventCreator = this.eventCreator.bind(this);
    this.eventDeletor = this.eventDeletor.bind(this);
    this.eventUpdater = this.eventUpdater.bind(this);
    this.postEvent = this.postEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  fetchMonth(month, monthId) {
    console.log('here')
    fetch(`http://localhost:5050/month/${month}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, [monthId]: data, eventsClicked: false});
    })
  }

  fetchEvents(month, id) {
    console.log(month)
    fetch(`http://localhost:5050/month/${month}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, clicked: true, current: month, eventsClicked: true, currentDay: data, date: id, createEvent: false, deleteEvent: false, updateEvent: false});
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

  eventDeletor(event, eventid) {
    if (this.state.deleteEvent === false) {
      console.log('DELETE')
      console.log(event)
      console.log('ID: ', eventid)
      this.setState({ ...this.state, deleteEvent: true, currentEvent: event, currentEventId: eventid})
    } else {
      this.setState({ ...this.state, deleteEvent: false, currentEvent: null, currentEventId: null})
    }
  }

  eventUpdater(event) {
    if (this.state.updateEvent === false) {
      console.log('UPDATE')
      console.log(event)
      this.setState({ ...this.state, updateEvent: true, currentEvent: event })
    } else {
      this.setState({ ...this.state, updateEvent: false, currentEvent: null })
    }
  }

  postEvent(event, time, month, day) {
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
    console.log('event to delete: ', eventToDelete)
    console.log(this.state.current)
    console.log(this.state.date)
    fetch(`http://localhost:5050/month/${this.state.current}/${this.state.date}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({event: eventToDelete})
    })
    .then(response => response.json())
    .then(data => {
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

  updateEvent(newDescription, newTime) {
    console.log('IN UPDATE')
    console.log('Description: ', newDescription)
    console.log('Time: ', newTime)
    console.log('id: ', this.state.currentEventId)
    fetch(`http://localhost:5050/month/${this.state.current}/${this.state.date}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({event: newDescription, time: newTime, _id: this.state.currentEventId})
    })
    .then(response => response.json())
    .then(data => {
      console.log('DATA BACK: ', data)
      let newEvents = this.state.currentDay
      console.log('events: ', newEvents)
      for (let i = 0; i < newEvents.length; i++) {
        if(newEvents[i].event == this.state.currentEvent) {
          newEvents[i].event = newDescription
          newEvents[i].time = newTime
          break;
        }
      }
      this.setState({...this.state, deleteEvent: false, updateEvent: false, currentDay: newEvents, currentEvent: null})
    })
  }

  render() {
    let month = (new Date().getMonth()) + 1;
    let currMonth;
    let tempState = {...this.state};
    for (const key of Object.keys(tempState)) {
      console.log('key ', key)
      console.log('month ', month)
      if (key == month) {
        console.log('number: ', tempState[key])
        currMonth = tempState[key];
        console.log(currMonth)
        break;
      }
    }


    const months = [];
    let monthPage;
    let currentEvents;
    let eventCreation;
    let eventDeletion;
    let eventUpdating;
    if (this.state.updateEvent === true) {
      eventUpdating = <EventUpdate updateEvent={this.updateEvent} fetchEvents={this.fetchEvents} currentMonth={this.state.current} date={this.state.date} currentEvent={this.state.currentEvent}/>
    } else if (this.state.deleteEvent === true) {
      eventDeletion = <EventDelete deleteEvent={this.deleteEvent} fetchEvents={this.fetchEvents} eventUpdater={this.eventUpdater} currentMonth={this.state.current} date={this.state.date} currentEvent={this.state.currentEvent}/>
    } else if (this.state.createEvent === true) {
      eventCreation = <EventCreate postEvent={this.postEvent} fetchEvents={this.fetchEvents} currentMonth={this.state.current} date={this.state.date}/>
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
      <div>
        <button className="todaysEvents" onClick={() => {this.fetchEvents(currMonth, new Date().getDate())}}>Today's events</button>
        <div id="monthContainer">
          {months}
          {this.state.clicked && <div id="monthName">{this.state.current}</div>}
          {this.state.clicked && <div>{monthPage}</div>}
          {this.state.eventsClicked && <div>{currentEvents}</div>}
          {this.state.createEvent && <div>{eventCreation}</div>}
          {this.state.deleteEvent && <div>{eventDeletion}</div>}
          {this.state.updateEvent && <div>{eventUpdating}</div>}
        </div>
      </div>
    )
  }
}