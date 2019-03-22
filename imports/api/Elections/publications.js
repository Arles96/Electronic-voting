import { Meteor } from 'meteor/meteor';
import Elections from './Elections';

if (Meteor.isServer) {

  Meteor.publish('Elections.all', function () {
    return Elections.find();
  });

  Meteor.publish('Elections.once', function () {
    if (Meteor.userId()) {
      return Elections.find({
        $or: [
          { idCreator: Meteor.userId() },
<<<<<<< HEAD
          { members: { $in: [Meteor.userId()] } }
=======
          { members: { $in: [ Meteor.userId() ] } }
>>>>>>> 7885e64356be14240f8cedf4f163f32ebc4984b4
        ]
      });
    }
  });
}
