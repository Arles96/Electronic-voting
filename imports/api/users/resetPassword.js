import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { RegExObj, messages } from '../regEx';

const resetPasswordSchema = new SimpleSchema({
  password: {
    label: 'Contraseña',
    type: String,
    regEx: RegExObj.password,
    min: 6
  },
  passwordAgain: {
    type: String,
    label: 'Confirmar Contraseña',
    min: 6,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      } else {
        return 1;
      }
    }
  }
}, { check: check, tracker: Tracker });

resetPasswordSchema.messageBox.messages(messages);

export default resetPasswordSchema;