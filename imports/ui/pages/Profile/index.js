import Profile from './Profile.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/* export default withTracker(() => {
  const user = Meteor.user();
  return {
    user
  }
}, Profile); */

export default Profile;
