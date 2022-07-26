import React, { Component } from 'react';
import MonthContainer from './containers/MonthContainer.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Online Calendar</h1>
        <h2>Today's date is {new Date().toDateString()}</h2>
        <MonthContainer/>
      </div>
    );
  }
}