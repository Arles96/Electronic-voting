import { Meteor } from 'meteor/meteor';

Meteor.pollings.deny({
  update() {
    return true;
  },
});
