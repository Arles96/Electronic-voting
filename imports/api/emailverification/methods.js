import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import EmailVerification from './emailverification';

Meteor.methods({
    insertEmailVerification: function (data) {
        console.log(data)
        const token = EmailVerification.insert({
            userid: Meteor.userId(),
            creationtime: data.creationtime,
            activo: data.activo,
            dyingtime: data.dyingtime,
        })
        const url = Meteor.absoluteUrl(`ConfirmationEmail/${token}`);
        Email.send({
            from: "from@mailinator.com",
            to: "marioraudales33@gmail.com",
            subject: "Subject",
            text: `Here is some text ${url}`
        });
    }
});
