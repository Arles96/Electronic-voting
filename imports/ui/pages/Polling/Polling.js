import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import PollingStartButtons from '../../components/PollingStartButtons/PollingStartButtons';
import CreatePolling from '../../components/CreatePolling/CreatePolling';
import SharePolling from '../../components/SharePolling/SharePolling';
import ListPolling from '../../components/ListPolling/ListPolling';
import './Polling.scss';

class Polling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 0,
      timer: 30
    };
    this.handleCreatePolling = this.handleCreatePolling.bind(this);
    this.handleSharePolling = this.handleSharePolling.bind(this);
    this.handleListPolling = this.handleListPolling.bind(this);
  }

  handleCreatePolling() {
    this.setState(state => ({
      flag: 1
    }));
    // alert(1);
  }

  handleSharePolling() {
    this.setState(state => ({
      flag: 2
    }));
    // alert(2);
  }

  handleListPolling() {
    this.setState(state => ({
      flag: 3
    }));
    // alert(3);
  }

  render() {
    return <div className="polling-body">
      <NavBar />
      <PollingStartButtons handleCreatePolling={this.handleCreatePolling} handleSharePolling={this.handleSharePolling} handleListPolling={this.handleListPolling} />
      {(this.state.flag == 1 ? <CreatePolling /> : '')}
      {(this.state.flag == 2 ? <SharePolling /> : '')}
      {(this.state.flag == 3 ? <ListPolling /> : '')}
    </div >;
  }
}

export default Polling;
