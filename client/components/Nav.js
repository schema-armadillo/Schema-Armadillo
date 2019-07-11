import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
    width: 100%;
    background-color: lightblue;
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
    <NavContainer id='nav'>
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
    </NavContainer>
  );
}

export default Nav;