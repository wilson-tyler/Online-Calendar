import React, { Component } from 'react';

export default class EventCreate extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className='updatePage'>
        Create a new Event for
        <div id="currDay">{this.props.currentMonth} {this.props.date}</div>
        <input id="eventDescription" placeholder='Describe event...'></input>
        <label></label>

        <select name="times" id="times">
          <option value="1">12:00AM</option>
          <option value="2">1:00AM</option>
          <option value="3">2:00AM</option>
          <option value="4">3:00AM</option>
          <option value="5">4:00AM</option>
          <option value="6">5:00AM</option>
          <option value="7">6:00AM</option>
          <option value="8">7:00AM</option>
          <option value="9">8:00AM</option>
          <option value="10">9:00AM</option>
          <option value="11">10:00AM</option>
          <option value="12">11:00AM</option>
          <option value="13">12:00PM</option>
          <option value="14">1:00PM</option>
          <option value="15">2:00PM</option>
          <option value="16">3:00PM</option>
          <option value="17">4:00PM</option>
          <option value="18">5:00PM</option>
          <option value="19">6:00PM</option>
          <option value="20">7:00PM</option>
          <option value="21">8:00PM</option>
          <option value="22">9:00PM</option>
          <option value="23">10:00PM</option>
          <option value="24">11:00PM</option>
        </select>
        <button id="postEventBtn" onClick={() => {this.props.postEvent(document.getElementById('eventDescription').value, document.getElementById('times').options[document.getElementById('times').selectedIndex].text, this.props.currentMonth, this.props.date)}}>Post event</button>
        <button id='cancelEvent' onClick={this.props.eventCreator}>Discard event</button>
      </div>
    )
  }
}