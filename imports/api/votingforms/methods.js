import { Meteor } from 'meteor/meteor';

import { VotingForms } from './votingforms'

Meteor.methods({
  insertVotingForm: function(data) {
    VotingForms.insert({
      name: data.name,
      creationDate: new Date()
    });
  }
});
