import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
    });
    initializeFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault()
    }


    const handleResponse = (res, redirect) => {
        setNewUser(res)
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }
    const handleBlur = (e) => {
        let isFieldValid = 'true'
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Firebase auth</h1>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }<br />
            {
                <button onClick={fbSignIn}>Sign In with facebook</button>
            }
            <h1>Our Own Authentication</h1>
            <form onSubmit={handleSubmit}>
                <input type="checkbox" name="newUser" id="" onChange={() => { setNewUser(!newUser) }} />
                <label htmlFor="newUser">New User Sign Up</label><br />
                {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" />}<br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Email Address" required /><br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Enter Your Password" required /><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} onClick={handleSubmit} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged in'} successfully!</p>}
        </div>
    );
}

export default Login;
