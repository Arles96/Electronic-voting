import { Meteor } from 'meteor/meteor';
import VotingForms from '../votingforms';

Meteor.publish('votingforms.all', () => VotingForms.find());
