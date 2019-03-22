import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import EmailVerification from './emailverification';

Meteor.methods({
    insertEmailVerification: function(data) {
        console.log(data)
        EmailVerification.insert({
            userid: Meteor.userId(),
            creationtime: data.creationtime,
            activo: data.activo,
            dyingtime: data.dyingtime,
          })
    }
});
