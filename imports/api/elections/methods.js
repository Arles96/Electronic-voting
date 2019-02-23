/* eslint-disable no-unused-vars */
/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


import Elections from './elections'

Meteor.methods({
    insertElection: function(data) {
        console.log(data)
        Elections.insert({
            title: data.title,
            description: data.description,
            type: data.type
          })
    }
});
