import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
    height: 50px;
    background-color: lightblue;
    display: flex;
    justify-content: space-between;

    div {
      height: 50px
      display: flex;
      justify-content: center;
    }
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
      <div id='nav-left'>
        <img src='../Armadillo-icon.jpg' style={{ width: '50px', borderRadius: '50%' }} />
        <button onClick={props.redirectToDashboard}>Schema Armadillo</button>
      </div>
      <div id='nav-right'>
        {props.isLogged && <h1>Log out</h1>}
        {!props.isLogged && <>
          <button href='https://github.com/login/oauth/authorize?client_id=a47e12225465438143f6&redirect_uri=http://localhost:3000/github&scope=user:email'>
            Sign In With Github
        </button>
          <button onClick={handleGoogleOAuth}>Sign in with Google</button>
          <button onClick={props.redirectToLogin}>Login</button>
          <button onClick={props.redirectToSignup}>Signup</button>
        </>}
      </div>
    </NavContainer>
  );
}

export default Nav;