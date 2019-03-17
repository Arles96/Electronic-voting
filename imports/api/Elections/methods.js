import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Elections from './Elections'

Meteor.methods({
  insertElection: function (data) {
    const done = Elections.insert({
      idCreator: data.creator, //  Creator Id
      name: data.name, // Name
      members: data.members, // User list
      finish_date: data.finish_date, // Finish date
      voted: data.voted, // Members who already voted
      status: data.status, // Votation status
      createAt: new Date() // Votation createAt
    });
    return done;
  },
  removeElection: function (id) {
    const done = Elections.remove({
      _id: id
    });
    return done;
  },
  addMembersElection: function (data) {
    const { election, userId } = data;
    const done = Elections.update({ _id: election._id }, {
      $set: {
        idCreator: election.creator,
        name: election.name,
        members: election.members.concat([userId]),
        finish_date: election.finish_date,
        voted: election.voted,
        status: election.status,
        createAt: election.createAt
      }
    });
    return done;
  }
});
