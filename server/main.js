import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function(options, user) {
  console.log("user created");
});
