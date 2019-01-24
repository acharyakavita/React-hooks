import React from 'react';

const list=(props)=>{
    console.log('Rendering list');
    return(
        <ul>
        {props.item.map(todo => (
          <li key={todo.id} onClick={props.onClick.bind(this,todo.id)}>{todo.name}</li>
        ))}
      </ul>
    )
}

export default list; 