import { } from 'meteor/meteor';
import {check} from 'meteor/check';
import {Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { messages } from '../regEx';

const UpdatePasswordSchema = new SimpleSchema({
    beforepassword: {
        label: 'Contraseña Anterior',
        type: String,
        regEx: RegExObj.password,
        min: 6
    },
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

UpdatePasswordSchema.messageBox.messages(messages);


export default UpdatePasswordSchema;