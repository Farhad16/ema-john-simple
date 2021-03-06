import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success: true
            }
            setUserToken();
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
        })
}



export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
        // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // var user = result.user;
        // user.success = true;
        // return user;
        // // The signed-in user info.
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
    });
}


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photoURL: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err);
        })
}


const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
}
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(err => {
            const newUserInfo = {};
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true
            return newUserInfo;
        })
        .catch(function (error) {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    }).then(function () {
        console.log("User name updated successfully");
    }).catch(function (error) {
        console.log(error);
    })
}