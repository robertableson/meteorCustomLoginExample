import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';

class CustomRegister extends Component{
  register(event){
    event.preventDefault();

    const id = this.refs.loginId.value;
    const pwd = this.refs.loginPassword.value;

    console.log(`id: ${id} pwd: ${pwd}`);

    Accounts.createUser({username: id, password: pwd, lol: {accType: "admin"}}, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("register login!!!!!!!!!");
      }
    });
  }

  render(){
    return(
      <div>
        register<br/>
        <input ref="loginId" type="text" id="inputUsername" className="form-control"
        placeholder="Identifiant (prenom.nom)" autoFocus/>
        <br/>
        <input ref="loginPassword" type="password" id="inputPassword" className="form-control"
        placeholder="Mot de passe"/>
        <br/>
        <button onClick={this.register.bind(this)} className="btn btn-lg btn-primary btn-block">Créer nouveau compte</button>
      </div>
    );
  }
}

export default CustomRegister;
