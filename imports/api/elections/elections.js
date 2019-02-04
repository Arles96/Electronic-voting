import { Mongo } from 'meteor/mongo';

const Elections = new Mongo.Collection('elections')
export default Elections;