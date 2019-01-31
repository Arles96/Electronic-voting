/* eslint-disable no-unused-vars */
/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


import VotingForms from './votingforms'

Meteor.methods({
    insertVotingForm: function(data) {
        console.log(data)
        VotingForms.insert({
            name: data.name,
            creationDate: new Date()
          })
    }
});
;
