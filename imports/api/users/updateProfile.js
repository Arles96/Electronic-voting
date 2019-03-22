import {  } from 'meteor/meteor';
import {  check} from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { messages } from '../regEx';

const UpdateProfileSchema = new SimpleSchema({
  firstName: {
    label: 'Nombres',
    type: String,
    custom: function () {
      const { value } = this;
      if (!value) {
        return 'required';
      }
      return 1;
    }
  },
  lastName: {
    label: 'Apellidos',
    type: String,
    custom: function () {
      const { value } = this;
      if (!value) {
        return 'required';
      }
      return 1;
    }
  },
  campus: {
    label: 'Campus',
    type: String,
    allowedValues: ['Unitec SPA', 'Unitec TGU']
  }
}, { check: check, tracker: Tracker });

UpdateProfileSchema.messageBox.messages(messages);


export default UpdateProfileSchema;
