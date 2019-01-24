import React,{useContext} from 'react';
import AuthContext from '../authContext'


const auth =(props)=>{
    const auth=useContext(AuthContext) 
    return(
    <button onClick={auth.login}>LogIn</button>
)}

export default auth;