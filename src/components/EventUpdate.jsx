import React, { Component } from 'react';

export default class EventUpdate extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    console.log('HERE HERE: ', this.props.currentEvent)
    return(
        <div className='updateEventPage'>
         <div id='updateTitle'>Update<hr/>"{this.props.currentEvent}"</div>

         <input id="eventDescriptionUpdate" placeholder='Describe event...'></input>
        <label></label>

        <select name="timesUpdate" id="timesUpdate">
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

          <button id="updateEventFinal" onClick={() => {this.props.updateEvent(document.getElementById('eventDescriptionUpdate').value, document.getElementById('timesUpdate').options[document.getElementById('timesUpdate').selectedIndex].text)}}>Update event</button>
          <button id='cancelEvent' onClick={this.props.eventCreator}>Discard changes</button>
         </div>
    )
  }
}