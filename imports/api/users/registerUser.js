import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { RegExObj, messages } from '../regEx';

const RegisterSchema = new SimpleSchema({
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
  email: {
    label: 'Correo',
    type: String,
    regEx: RegExObj.email
  },
  password: {
    label: 'Contraseña',
    type: String,
    regEx: RegExObj.password
  },
  confirmPassword: {
    label: 'Confirmar Contraseña',
    type: String,
    custom: function () {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      } else {
        return 1;
      }
    }
  },
  campus: {
    label: 'Campus',
    type: String,
    allowedValues: ['Unitec SPA', 'Unitec TGU']
  }
}, { check: check, tracker: Tracker });

RegisterSchema.messageBox.messages(messages);

export default RegisterSchema;
