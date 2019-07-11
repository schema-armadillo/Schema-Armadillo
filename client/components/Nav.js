import React from 'react';

const Nav = (props) => {

  const handleGoogleOAuth = (event) => {
    event.preventDefault();
    fetch('/google/googleInit')
      .then(response => {
        window.location = `http://localhost:3000/google/googleInit`
      })
      .catch(err => console.error(err))
  }

  return (
    <div id='nav'>
      <img src='../Armadillo-icon.jpg' style={{ width: '100px' }} />
      Schema Armadillo
      {props.isLogged && <h1>Log out</h1>}
      {!props.isLogged && <>
        <a>Login</a>
        <a>Signup</a>
        <a href='https://github.com/login/oauth/authorize?client_id=a47e12225465438143f6&redirect_uri=http://localhost:3000/github&scope=user:email'>
          Sign In With Github
        </a>
        <a onClick={handleGoogleOAuth}>Sign in with Google</a>
      </>}
    </div>
  );
}

export default Nav;