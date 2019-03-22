/* eslint-disable no-unused-vars */
/**
 * Meteor methods
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


import { Elections, ElectionsSchema } from './elections'

Meteor.methods({
    insertElection: function(data) {
        // ElectionsSchema.validate(data);
        Elections.insert(data);
    }
});
