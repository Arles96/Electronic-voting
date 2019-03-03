import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Pollings from './pollings'

Meteor.methods({
  insertPolling: function (data) {
    console.log(data);
    /*
    Pollings.insert({
      idCreator: data.creator, //  Creator Id
      name: data.name, // Name
      members: data.members, // User list
      creation_date: data.creation_date, // Creation date
      finish_date: data.finish_date, // Finish date
      voted: data.voted, // Members who already voted
      no_voted: data.no_voted, // Members who have not voted
      status: data.status, // Votation status
      createAt: () => new Date() // Votation createAt
    });
    */
  }
});
