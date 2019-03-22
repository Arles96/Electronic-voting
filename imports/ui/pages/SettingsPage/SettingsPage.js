import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import LeftMenuProfile from '../../components/leftMenuProfile/leftMenuProfile';
import NavbarLogout from '../../components/NavbarLogout';
import UdpdateInfoUser from '../../components/updateInfoUser/updateInfoUser';

class SettingsPage extends React.Component {
  componentWillMount () {
    if (!this.props.userId) {
      return this.props.history.push('/login');
    }
  }
  render () {
    const { user } = this.props;
    return (
      <div id="settingsPage" >
        <NavbarLogout />
        <Grid container className="profile-page">
          <Grid.Column width={6}>
            <LeftMenuProfile user={user} length={this.props.elections.fetch().length} />
          </Grid.Column>
          <Grid.Column width={10}>
            <UdpdateInfoUser user={user} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

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
})(SettingsPage);