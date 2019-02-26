import { Meteor } from 'meteor/meteor';
import elections from '../elections';

Meteor.publish('elections.all', () => elections.find());
