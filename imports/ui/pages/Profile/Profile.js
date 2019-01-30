import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';


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
       <Grid>
        <Grid.Column floated='left' width={4}>
          <Image src='/images/wireframe/paragraph.png' />
        </Grid.Column>
        <Grid.Column floated='right' width={8}>
          <Image src='/images/wireframe/paragraph.png' />
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
