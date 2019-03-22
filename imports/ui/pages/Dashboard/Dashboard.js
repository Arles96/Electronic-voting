import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react'
import NavbarLogout from '../../components/NavbarLogout';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import ElectionPage from '../ElectionPage/ElectionPage';
import Home from '../Home/Home';
import './Dashboard.scss';
import Elections from '../../../api/Elections/Elections';

class Dashboard extends Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      return this.props.history.push('/login');
    }
  }
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
      <NavbarLogout />
      <Grid doubling>
        <Grid.Row >
          <Grid.Column width={3}>
            <LeftMenu handleItemClick={this.handleItemClick} />
          </Grid.Column>
          <Grid.Column width={13}>
            {(this.state.activeItem === 'Inicio' ? <Home /> : '')}
            {(this.state.activeItem === 'Elecciones' ? <ElectionPage /> : '')}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >;
  }
}
 
Dashboard.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  electionsReady: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTracker(props => {
  const electionsSub = Meteor.subscribe('Elections.all');
  const elections = Elections.find();
  const electionsReady = electionsSub.ready() && !!elections;
  return {
    user: Meteor.user(),
    electionsReady: electionsReady,
    loggedIn: props.loggedIn,
    history: props.history
  };
})(Dashboard);

