


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@ LOGIN / REGISTRATION VALIDATIONS @@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*  No need to check password field of user as it is automaticallly hashed and
 *  salted, even if it is inserted through the developer console with a length
 *  of <8 chars
 */
Accounts.validateNewUser(function (user) {
  if(!user.username || user.username.length < 8
    || user.username.length > 30){
    throw new Meteor.Error(403,
      "L'identifiant doit avoir entre 8 et 30 caractères.");
  }

  return true;
});

Accounts.validateLoginAttempt(function(attempt){
  console.log(attempt);

  //if user is registering
  if(attempt.methodName === "createUser"){
    //if error in registration
    if (attempt.error){
      var reason = attempt.error.reason;

      if (reason === "Need to set a username or email"){
        throw new Meteor.Error("empty-id",
          "Veuillez saisir un identifiant.");
      }else if(reason === "Username already exists."){
        throw new Meteor.Error("id-exists",
          "Désolé, cet utilisateur existe déjà.");
      }else if(reason === "Password may not be empty"){
        throw new Meteor.Error("empty-pwd", "Veuillez saisie un mot de passe.");
      }
    }

    //no error in registration
    throw new Meteor.Error("user-not-validated-yet",
      "Création du compte réussie! \n Vous pourrez vous connecter lorsque " +
      "votre compte aura été validé par un administrateur du système.");
  }
  //if user is trying to log in
  else{
    if(attempt.error){
      var reason = attempt.error.reason;
      if (reason === "User not found"){
        throw new Meteor.Error("id-not-found",
          "Cet identifiant n'existe pas.");
      }else if (reason === "Incorrect password"){
        throw new Meteor.Error("incorrect-password",
          "Le mot de passe ne correspont pas à cet identifiant.");
      }
    }
    else if(attempt.user && !attempt.user.profile){
      throw new Meteor.Error("user-not-validated-yet",
        "Votre compte est en attente de validation " +
        "par un administrateur du système.");
    }
  }

  return attempt.allowed;
});
