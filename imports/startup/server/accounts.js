/**
 * Accounts Setup
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (!process.env.MAIL_URL) {
  // console.log(Meteor.settings.private);
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}

Meteor.startup(() => {
  Accounts.urls.resetPassword = token => {
    return Meteor.absoluteUrl(`/reset-password/${token}`);
  }
});
