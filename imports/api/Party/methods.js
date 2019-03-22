import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Party from './Party'

Meteor.methods({
  insertParty: function (data) {
    const done = Party.insert({
      idCreator: data.creator, //  Creator Id
      name: data.name, // Name
      members: data.members, // User list
      motto: data.motto //Motto
      //photo: data.members
    });
    return done;
  },
  removeParty: function (id) {
    const done = Party.remove({
      _id: id
    });
    return done;
  },
  addPartyMember: function (data) {
    const { party, userId } = data;
    const done = Party.update({ _id: party._id }, {
      $set: {
        idCreator: party.creator,
        name: party.name,
        members: party.members.concat([userId]),
        motto: party.motto
        //photo: party.photo
      }
    });
    return done;
  }
});
