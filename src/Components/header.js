import React,{useContext} from 'react';
import Authcontext from '../authContext';


const header =(props)=>{

    const auth=useContext(Authcontext);
    return(
    <header>
        {auth.status?<button onClick={props.onLoadTodos}>Todo List</button> : null} 
        
        <button onClick={props.onLoadAuth}>Auth</button>
    </header>)
}

export default header;