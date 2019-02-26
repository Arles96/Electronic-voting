import { Meteor } from 'meteor/meteor';
import { Elections } from '../elections';

Meteor.publish('elections.all', () => Elections.find());
