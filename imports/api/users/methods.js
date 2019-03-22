/* eslint-disable no-unused-vars */
/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import UpdateProfileSchema from './updateProfile';


Meteor.methods({
  updateProfile: function (doc) {
    UpdateProfileSchema.validate(doc);
    Meteor.users.update({ _id: Meteor.userId() }, {
      $set: {
        profile: doc
      }
    });
  }
});
