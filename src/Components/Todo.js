import React, { useState, useEffect, useReducer, useRef, useMemo } from "react";
import axios from "axios";
import List from "./List";
import {useFormInput} from '../hooks/forms'

const todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  const todoInput=useFormInput()
  // const [todoName, setTodoName] = useState("");
  //const [todoList, setTodoList] = useState([]);
  // const [submittedTodo,setSubmittedTodo]=useState(null)
  const todoInputRef = useRef();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload.id);
      default:
        return this.state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios
      .get("https://react-hooks-4733a.firebaseio.com/todos.json")
      .then(res => {
        console.log(res);
        const todoData = res.data;
        const todos = [];
        for (let key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        dispatch({ type: "SET", payload: todos });
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      console.log("CleanUp");
    };
  }, []);

  const mouseMovehandler = event => {
    console.log(event.clientX, event.clientY);
  };

  /* useEffect(() => {
    document.addEventListener("mousemove", mouseMovehandler);
    return () => {
      document.removeEventListener(
        "mousemove",
        mouseMovehandler
      ); /*cleanup before re-rendering(componentUnmount)*/
  //   };
  // });

  /*useEffect(()=>{
    if(submittedTodo){
      dispatch({type:'ADD',payload:submittedTodo});
    }
    
  },[submittedTodo])*/

  /*const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };
*/

  const todoAddHandler = () => {
    //const todoName = todoInputRef.current.value;
    const todoName=todoInput.value
    axios
      .post("https://react-hooks-4733a.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: "ADD", payload: todoItem });
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://react-hooks-4733a.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: "REMOVE", payload: todoId });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const inputValidationHandler = event => {
    if (event.target.value.trim() === "") {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        /*ref={todoInputRef}
        onChange={inputValidationHandler}*/
        onchange={todoInput.onChange}
        value={todoInput.value}
        style={{ backgroundColor: todoInput.validity===true ? "transparent" : "red" }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

export default todo;
