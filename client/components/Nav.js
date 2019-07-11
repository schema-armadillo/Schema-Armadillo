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


  return (
    <NavContainer id='nav'>
      <div id='nav-left'>
        <img src='../Armadillo-icon.jpg' style={{ width: '50px', borderRadius: '50%' }} />
        <button onClick={props.redirectToDashboard}>Schema Armadillo</button>
      </div>
      <div id='nav-right'>
        {props.isLogged && <h1>Log out</h1>}
        {!props.isLogged && <>

          <button onClick={props.redirectToLogin}>Login</button>
          <button onClick={props.redirectToSignup}>Signup</button>
        </>}
      </div>
    </NavContainer>
  );
}

export default Nav;