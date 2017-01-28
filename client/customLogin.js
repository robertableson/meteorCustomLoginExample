import React, {Component} from 'react';

class CustomLogin extends Component{
  constructor(props){
    super(props);
    this.state = {message: ''};
  }

  login(event){
    event.preventDefault();

    const id = this.refs.loginId.value;
    const pwd = this.refs.loginPassword.value;

    console.log(`id: ${id} pwd: ${pwd}`);

    Meteor.loginWithPassword(id, pwd, (err) => {
      if(err){
        this.setState({message: err.reason});
      }else{
        console.log("success login!!!!!!!!!");
      }
    });
  }

  logout(event){
    event.preventDefault();
    Meteor.logout(function(error){
      if(error){
        console.log(error);
      }else{
        console.log("success logout");
      }
    });
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
        login<br/>
        <input ref="loginId" type="text" id="inputUsername" className="form-control"
        placeholder="Identifiant (prenom.nom)" autoFocus/>
        <br/>
        <input ref="loginPassword" type="password" id="inputPassword" className="form-control"
        placeholder="Mot de passe"/>
        <br/>
        <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block">Se connecter</button>
        <button onClick={this.logout.bind(this)} className="btn btn-lg btn-primary btn-block">Se Déconnecter</button>

      </div>
    );
  }
}

export default CustomLogin;
