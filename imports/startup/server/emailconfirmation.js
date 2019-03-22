import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (!process.env.MAIL_URL) {
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}

