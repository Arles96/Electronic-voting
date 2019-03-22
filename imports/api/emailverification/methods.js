import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import EmailVerification from './emailverification';

Meteor.methods({
    insertEmailVerification: function (data) {
        console.log(data)
        const tem = EmailVerification.findOne({ userid: Meteor.userId(), electionid: data.electionid });
        if (!tem) {
          const date = new Date();
          const token = EmailVerification.insert({
              userid: Meteor.userId(),
              creationtime: date,
              activo: true,
              electionid: data.electionid,
              dyingtime: new Date(`${date.getDate() + 1}-${date.getMonth()}-${date.getFullYear()}`),
          })
          const url = Meteor.absoluteUrl(`ConfirmationEmail/${token}`);
          Email.send({
              from: "from@mailinator.com",
              to: Meteor.user().emails[0].address,
              subject: "Verificación para votar",
              text: `Here is some text ${url}`
          });
        } else {
          throw new Meteor.Error('Ya se ha enviado el correo de verificación');
        }
    },
    updateEmailVerification: function(_id){
        const temp = EmailVerification.findOne({ _id: _id, activo: true });
        if(temp){
            EmailVerification.update({_id}, { $set: { activo: false } });
            return true;
        }else{
            return false;
        }
    }
});
