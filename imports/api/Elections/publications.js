import { Meteor } from 'meteor/meteor';
import Elections from './Elections';

if (Meteor.isServer) {

  Meteor.publish('Elections.all', function () {
    return Elections.find();
  });

  Meteor.publish('Elections.once', function () {
    if (Meteor.user()) {
      return Elections.find({
        $or: [
          { idCreator: Meteor.userId() },
          { members: { $in: [Meteor.userId()] } }
        ]
      });
    }
    return this.ready();
  });
}
