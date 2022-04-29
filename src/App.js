import React, { useState, useEffect } from 'react';
import './App.css';
import { TodoList } from './TodoList';


function App() {

  const [inputList, setInputList] = useState("");
  const [task, setTask] = useState([]);

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem("task"))
    if (storedTodos) setTask(storedTodos)
  }, [])

  // saving the todos
  useEffect(()=>{
    localStorage.setItem("task", JSON.stringify(task))
  }, [task])



  const taskEvents = (event) => {
    setInputList(event.target.value);
  };
  const listOfTask = () => {
    console.log("btn clicked");
    setTask((oldTask) => {
      return [...oldTask, inputList];
    });
    setInputList("");
  }
  const deleteTask = (id) => {
    console.log("delete btn clicked")
    setTask((oldTask) => {
      return oldTask.filter((element, index)=>{
        return index !== id;
      });
    });
  }
  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>ToDo List</h1>
          <br />
          <input type="text" placeholder="Add Task" value={inputList} onChange={taskEvents} />
          <button onClick={listOfTask}>+</button>
          <ol>
            {task.map((taskValue, index) => {
              return <TodoList key={index} id={index} text={taskValue} onSelect={deleteTask} />;
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
