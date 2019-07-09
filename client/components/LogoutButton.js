import React, { Component } from 'react';
import Cookies from 'js-cookie';


function LogoutButton() {

    const deleteCookie = () => {
        Cookies.remove('ssid');
        <Redirect to='/login' />;
    };

    return (
        <div>
        <form onSubmit={deleteCookie}>
        <button type='submit' id='logout-button' >Logout</button>
        </form>
       
        </div>
    )
}

export default LogoutButton
