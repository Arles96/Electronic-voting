import ElectionPage from '../ElectionPage/ElectionPage';
import './Dashboard.scss';
import Elections from '../../../api/Elections/Elections';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import NavbarLogout from '../../components/NavbarLogout';
import { Grid } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import LeftMenuProfile from '../../components/leftMenuProfile/leftMenuProfile';

class Dashboard extends Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      return this.props.history.push('/login');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { user, elections } = this.props;
    return (
      <div id="profileHome" >
        <NavbarLogout />
        <Grid container className="profile-page">
          <Grid.Column width={6}>
            <LeftMenuProfile user={user} length={elections.fetch().length} />
          </Grid.Column>
          <Grid.Column width={10}>
            {this.props.readyElections ? <ElectionPage elections={elections} /> : <Spinner />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


Dashboard.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTracker(props => {
  const readyElections = Meteor.subscribe('Elections.once');
  const elections = Elections.find();
  return {
    user: Meteor.user(),
    loggedIn: props.loggedIn,
    history: props.history,
    elections: elections,
    readyElections: readyElections.ready(),
    userId: Meteor.userId()
  }
})(Dashboard);
