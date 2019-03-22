import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

import { messages, RegExObj } from '../regEx'

const Elections = new Mongo.Collection('elections');

const ElectionsSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Título',
    regEx: RegExObj.names
  },
  description: {
    type: String,
    label: 'Descripción',
    regEx: RegExObj.names
  },
  type: {
    type: String,
    label: 'Tipo',
    regEx: RegExObj.names
  }
}, { check: check, tracker: Tracker });
  
ElectionsSchema.messageBox.messages(messages);

Elections.attachSchema(ElectionsSchema);

export { Elections, ElectionsSchema };