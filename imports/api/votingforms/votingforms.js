import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

import { messages, RegExObj } from '../regEx'

const VotingForms = new Mongo.Collection('votingforms');

const VotingFormsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.names
  },
  date: {
    type: Date,
    label: 'Fecha',
  }
}, { check: check, tracker: Tracker });

VotingFormsSchema.messageBox.messages(messages);

VotingForms.attachSchema(VotingFormsSchema);

export { VotingForms, VotingFormsSchema };