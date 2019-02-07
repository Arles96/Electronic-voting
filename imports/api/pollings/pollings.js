import { Mongo } from 'meteor/mongo';

const Pollings = new Mongo.Collection('pollings')
export default Pollings;