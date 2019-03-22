import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import Dashboard from '../../components/Dashboard/Dashboard';
import './Polling.scss';
import NavBarLogout from '../../components/NavbarLogout/NavbarLogout';

class Polling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }

  render() {
    return <div className="polling-body">
      <NavBarLogout {...this.props} />
      <Dashboard />
    </div >;
  }
}

export default Polling;
