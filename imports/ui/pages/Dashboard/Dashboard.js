import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react'
import NavBar from '../../components/Navbar/Navbar';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Pollings from '../Pollings/Pollings';
import Home from '../Home/Home';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Inicio',
      timer: 30
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = item => this.setState(state => item);

  render() {
    return <div className="Dashboard-body">
      <NavBar />
      <Grid doubling >
        <Grid.Row >
          <Grid.Column width={3}>
            <LeftMenu handleItemClick={this.handleItemClick} />
          </Grid.Column>
          <Grid.Column width={13}>
            {(this.state.activeItem === 'Inicio' ? <Home /> : '')}
            {(this.state.activeItem === 'Votaciones' ? <Pollings /> : '')}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >;
  }
}

export default Dashboard;
