// Publications to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
  // all users publication (admin only)
  Meteor.publish('users.all', function() {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      return Meteor.users.find();
    }
    return this.ready();
  });

  // current logged in user publication
  Meteor.publish('user', function() {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: {
            emails: 1,
            profile: 1,
            status: 1,
          },
        }
      );
    }
    return this.ready();
  });
}
