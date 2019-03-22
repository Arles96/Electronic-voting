import { Meteor } from 'meteor/meteor';
import Party from './Party';

if (Meteor.isServer) {

  Meteor.publish('Party.all', function () {
    return Party.find();
  });

  Meteor.publish('Party.once', function () {
    if (Meteor.user()) {
      return Party.find({
        $or: [
          { idCreator: Meteor.userId() },
          { members: { $in: Meteor.userId() } }
        ]
      });
    }
    return this.ready();
  });
}
