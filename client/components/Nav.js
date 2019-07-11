import React from 'react';

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 600px;
    padding-top: 150px;
    align-items: center;
    `;

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
      <a onClick={props.redirectToDashboard}>Schema Armadillo</a>
      {props.isLogged && <h1>Log out</h1>}
      {!props.isLogged && <>
        <a onClick={props.redirectToLogin}>Login</a>
        <a onClick={props.redirectToSignup}>Signup</a>
        <a href='https://github.com/login/oauth/authorize?client_id=a47e12225465438143f6&redirect_uri=http://localhost:3000/github&scope=user:email'>
          Sign In With Github
        </a>
        <a onClick={handleGoogleOAuth}>Sign in with Google</a>
      </>}
    </div>
  );
}

export default Nav;