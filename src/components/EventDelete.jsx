import React, { Component } from 'react';

export default class EventDelete extends Component{
  constructor(props) {
    super(props);
  }
  render() {

    return(
        <div className='updatePage'>
          <button id="updateEvent" onClick={this.props.updateEvent}>Update event</button>
          <button id="deleteEvent" onClick={() => {this.props.deleteEvent(this.props.currentEvent)}}>Delete event</button>
          <button id="backToEvent" onClick={() => {this.props.fetchEvents(this.props.currentMonth, this.props.date)}}>Back to events</button>
         </div>
    )
  }
}