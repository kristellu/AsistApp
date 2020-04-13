import React, { Component } from 'react'
//import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'

import './index.css'
import 'materialize-css/dist/css/materialize.min.css'

class Login extends Component {
  constructor(){
    super();

    this.state = {
      isLogged: false
    }

    //this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }
  componentWillMount() {
    if (localStorage.getItem("fbData") || localStorage.getItem("googleData")) {
      this.setState({ isLogged: true });
    }
  }
/*   responseFacebook(response) {
    console.log("entro aquiiiii");
    localStorage.setItem("fbData", JSON.stringify({
      token: response.token,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
      social: 'fb'
    }));

    this.setState({ isLogged: true });
  } */
  responseGoogle(response) {
    console.log("entro aquiiiii");
    localStorage.setItem("googleData", JSON.stringify({
      token: response.token,
      email: response.profileObj.email,
      name: response.profileObj.name,
      picture: response.profileObj.imageUrl,
      social: 'google'
      
    }));
    this.setState({ isLogged: true });
  }
  onFailure(error) {
    console.log(error);
  }
  render() {
    if (this.state.isLogged) {
      return(<Redirect to="/home/"/>);
    }
    return(
      <div className="Login">
          <div className="Login-box">
            <div className="card">
              <div className="card-content">
                {/* <FacebookLogin
                  appId="207686160677151"
                  autoload={ false }
                  fields="name, email, picture.width(120)"
                  callback={ this.responseFacebook }
                  onFailure={ this.onFailure }
                  textButton="Facebook"
                  cssClass="waves-effect waves-light btn blue darken-2"
                  icon="fa fa-facebook"/>
                <br/> */}
                <GoogleLogin
                  clientId="623229261966-380nt4non4tf9fh551rh5m58lv3sar93.apps.googleusercontent.com"
                  autoLoad={ false }
                  onSuccess={ this.responseGoogle }
                  onFailure={ this.onFailure }
                  className="waves-effect waves-light btn red lighten-1">
                    <i className="fa fa-google" aria-hidden="true"></i>
                    <span>Login with Google</span>
                </GoogleLogin>

              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Login;
