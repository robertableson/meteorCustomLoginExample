import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

class CustomRegister extends Component{
  constructor(props){
    super(props);
    this.state = {message: ''};
  }

  validateRegisterInfo(id, pwd, pwdConf){
    var valid = false;

    if(id.length < 8){
      this.setState({
        message: "L'identifiant doit avoir un minimum de 8 caractères."});
    }else if(pwd.length < 6){
      this.setState({
        message: "Le mot de passe doit avoir un minimum de 6 caractères."});
    }else if(pwd !== pwdConf){
      this.setState({
        message: "La confirmation du mot de passe ne correspond pas."});
    }else{
      this.setState({message: "loading..."});
      valid = true;
    }

    return valid;
  }

  register(event){
    event.preventDefault();

    const userId = this.refs.loginId.value;
    const userPassword = this.refs.loginPassword.value;
    const userPasswordConfirm = this.refs.loginPasswordConfirm.value;

    if(this.validateRegisterInfo(userId, userPassword, userPasswordConfirm)){
      console.log("create user");
      Accounts.createUser({username: userId, password: userPassword}, (err) => {
        if(err){
          console.log(err);
          this.setState({message: err.reason});
        }else{
          console.log("register login!!!!!!!!!");
        }
      });
    }
  }

  render(){
    return(
      <div>
        {this.state.message !== '' ?
          <div style={{color:"red"}}>
            <strong>
              {this.state.message}
            </strong>
          </div>
        : null}
        register<br/>
        <input ref="loginId" type="text" id="inputUsername" className="form-control"
        placeholder="Identifiant (prenom.nom)" autoFocus/>
        <br/>
        <input ref="loginPassword" type="password" id="inputPassword" className="form-control"
        placeholder="Mot de passe"/>
        <br/>
        <input ref="loginPasswordConfirm" type="password" id="inputPassword" className="form-control"
        placeholder="Confirmation mot de passe"/>
        <br/>
        <button onClick={this.register.bind(this)} className="btn btn-lg btn-primary btn-block">Créer nouveau compte</button>
      </div>
    );
  }
}

export default CustomRegister;
