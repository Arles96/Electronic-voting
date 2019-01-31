import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {

  Meteor.publish('pollings.all', function () {
    return Meteor.pollings.find();
  });

  Meteor.publish('polling', function () {
    if (this.pollingId) {
      return Meteor.pollings.find(
        { _id: this.pollingId },
        {
          fields: {
            name: 1, // Name
            members: 1, // User list
            creation_date: 1, // Creation date
            finish_date: 1, // Finish date
            voted: 1, // Members who already voted
            no_voted: 1, // Members who have not voted
            status: 1, // Votation status
          },
        }
      );
    }
    return this.ready();
  });
}
