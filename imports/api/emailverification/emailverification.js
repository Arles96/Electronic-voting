import { Mongo } from 'meteor/mongo';

const EmailVerification = new Mongo.Collection('emailverification')
export default EmailVerification;