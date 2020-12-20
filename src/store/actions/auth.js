import axios from 'axios';
import * as Host_IP from '../../Host';
import * as actionTypes from './actionType';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) =>{
    return{
        type: actionTypes.AUTH_SUCCES,
        token: token
    }
}

export const authCheck = (token) =>{
    return{
        type: actionTypes.AUTH_CHECK,
        token: token
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000)
    }
}

export const authLogin = (username, password) =>{
    return dispatch =>{
        dispatch(authStart());
        axios.post(`${Host_IP}/rest-auth/login/`,{
            username: username,
            password: password
        })
        .then(res =>{
            const token = res.data.key;
            const expirationDate = new Date( (new Date()).getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err));

        })
    }
}

export const authSignup = (username, email, password1, password2) =>{
    return dispatch =>{
        dispatch(authStart());
        const x = axios.post(`${Host_IP}/rest-auth/registration/`,{
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res =>{
            const token = res.data.key;
            const expirationDate = new Date( (new Date()).getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err));
            if (err.response) {
                alert(err.response.data.password1[0]);
            }
        }) 
        
        console.log("Checking error", x);
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                dispatch(authCheck(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() -  (new Date()).getTime()) / 1000) );

            }
        }
    }
}
