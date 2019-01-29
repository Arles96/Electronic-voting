/**
 * Accounts Setup
 */

import { Meteor } from 'meteor/meteor';

if (!process.env.MAIL_URL) {
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}