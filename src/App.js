import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef() 

  //effect to LOAD todos; called once when component loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos)
      setTodos(storedTodos)
  }, [])

  //effect to STORE todos to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    //copy of todos state variable; should not directly modify state var
    const newTodos = [...todos]
    const todoToggled = newTodos.find(todo => todo.id === id)
    todoToggled.complete = !todoToggled.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name == '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo() {
    //variable to store NONcomplete todos (the ones being kept)
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos = { todos } toggleTodo = {toggleTodo} />
      <input ref = {todoNameRef} type = "text" />
      <button onClick = {handleAddTodo}>Add Todo</button>
      <button onClick = {handleClearTodo}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
