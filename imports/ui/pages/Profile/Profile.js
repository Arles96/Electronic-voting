import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Card, Icon, Feed} from 'semantic-ui-react';


import './Profile.scss';

class Profile extends React.Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      return this.props.history.push('/login');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      nextProps.history.push('/login');
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="profile-page">
        <div class="ui secondary pointing menu">
          <a class="item">
            Home
          </a>
          <a class="item">
            Messages
          </a>
          <a class="item">
            Friends
          </a>
          <div class="right menu">
            <a class="ui item active">
              Logout
            </a>
          </div>
        </div>
        <div class="ui segment">
          <p></p>
        </div>
        <Grid>
          <Grid.Column width={5}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={11}>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
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
/*
export default withTracker(() => {
  // counters example
  return undefined;
})(Profile); */

export default Profile;
