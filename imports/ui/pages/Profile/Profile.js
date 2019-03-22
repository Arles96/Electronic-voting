import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import NavbarLogout from '../../components/NavbarLogout';
import { Grid} from 'semantic-ui-react';
import ListElection from '../../components/listElectionCard/listElectionCard';
import Election from '../../../api/Elections/Elections';
import Spinner from '../../components/Spinner';
import LeftMenuProfile from '../../components/leftMenuProfile/leftMenuProfile';
import './Profile.scss';

class Profile extends React.Component {
  componentWillMount() {
    if (!this.props.userId) {
      return this.props.history.push('/login');
    }
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
            {this.props.readyElections ? <ListElection list={elections} /> : <Spinner />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


Profile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTracker(props => {
  const readyElections = Meteor.subscribe('Elections.once');
  const elections = Election.find();
  return {
    user: Meteor.user(),
    loggedIn: props.loggedIn,
    history: props.history,
    elections: elections,
    readyElections: readyElections.ready(),
    userId: Meteor.userId()
  }
})(Profile);
