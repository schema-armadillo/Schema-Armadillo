import React from 'react';
import styled from 'styled-components'

const NavContainer = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;

    div {
      height: 50px
      display: flex;
      justify-content: center;
    }

    img {
      cursor: pointer;
    }

    #greeting {
      background-color: white;
      border: none;
      border-bottom: 1.5px solid transparent;
      font-size: 20px;
      padding: 10px;
    }

    button {
      background-color: white;
      border: none;
      transition: 0.3s;
      border-bottom: 1.5px solid transparent;
      cursor: pointer;
    }

    button:hover {
      border-bottom: 1.5px solid coral;
    }

    button:focus {
      outline: none;
    }
    `;

const Nav = (props) => {

  const logout = () => {
    fetch('/auth/logout')
      .then(props.clearAppState)
      .then(props.redirectToSignup)
      .catch(err => console.log("error logging out", err))
  }

  return (
    <NavContainer id='nav'>
      <div id='nav-left'>
        <img onClick={props.redirectToDashboard} src='../Armadillo-icon.jpg' style={{ width: '50px', borderRadius: '50%' }} />
        <span id='greeting'>Hello {props.username}👋 </span>
      </div>
      <div id='nav-right'>
        {props.isLogged && <>
          <button onClick={logout}>Log out</button>
        </>}
        {!props.isLogged && <>
          <button onClick={props.redirectToLogin}>Login</button>
          <button onClick={props.redirectToSignup}>Signup</button>
        </>}
      </div>
    </NavContainer>
  );
}

export default Nav;