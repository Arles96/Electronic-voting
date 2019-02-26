/**
 * Accounts Setup
 */

import { Meteor } from 'meteor/meteor';

if (!process.env.MAIL_URL) {
  console.log(Meteor.settings.private);
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}