import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Pollings from './pollings'

Meteor.methods({
  insertPolling: function (data) {
    const done = Pollings.insert({
      idCreator: data.creator, //  Creator Id
      name: data.name, // Name
      members: data.members, // User list
      finish_date: data.finish_date, // Finish date
      voted: data.voted, // Members who already voted
      status: data.status, // Votation status
      createAt: new Date() // Votation createAt
    });
    return done;
  }
});
