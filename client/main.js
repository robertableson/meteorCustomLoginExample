import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

import CustomLogin from './customLogin';
import CustomRegister from './customRegister';

class App extends Component {
  //called when component rendered to screen
  componentDidMount(){
    //render the Blaze accounts form then find the div we just rendered in the
    // 'render' method and place the blaze accounts form in that div
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }

  //called when component is removed from screen
  componentWillUnmount(){
    //go find the forms we created and destroy them
    //we need to clean up those form ourselves
    Blaze.remove(this.view);
  }




  render(){
    return(
      <div>
        <div ref="container"></div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

          <CustomLogin/>

          <br/><br/><br/>

          <CustomRegister/>


      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.querySelector('.render-target'));
});
