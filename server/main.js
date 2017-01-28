import { Meteor } from 'meteor/meteor';

/*  No need to check password field of user as it is automaticallly hashed, 
 *  even if it is inserted through the developer console with a length of <8
 */
Accounts.validateNewUser(function (user) {
  if(Meteor.users.findOne({username: user.username})){
    throw new Meteor.Error(403,
      "Désolé, cet identifiant existe déjà.");
  }else if(!user.username || user.username.length < 8){
    throw new Meteor.Error(403,
      "L'identifiant doit avoir un minimum de 8 caractères.");
  }

  return true;
});

Accounts.validateLoginAttempt(function(attempt){
  if (attempt.error){
    console.log(attempt.error.reason);
    var reason = attempt.error.reason;
    if (reason === "Need to set a username or email"){
      throw new Meteor.Error(403, "Veuillez saisir un identifiant.");
    }else if(reason === "Username already exists."){
      throw new Meteor.Error(403, "Désolé, cet utilisateur existe déjà.");
    }else if(reason === "Password may not be empty"){
      throw new Meteor.Error(403, "lol");
    }
  }

  return attempt.allowed;
});
