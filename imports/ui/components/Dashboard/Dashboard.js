import React, { Component } from 'react';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  render() {
    return <div className="dashboard-body">

      <div className="dashboard-header">
        <h2>dashboard-breadcums</h2>
      </div>

      <div className="dashboard-sections">
        <div className="column side"><h3>Adds</h3></div>
        <div className="column middle"><h3>Desk</h3></div>
        <div className="column side"><h3>More options</h3></div>
      </div>

      <div className="footer">
        <p>UChoose®   Copyright©</p>
      </div>
    </div >
  }

}
export default Dashboard;
