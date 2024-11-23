import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from '../components/Header'
import ToDoForm from '../components/ToDoForm'
import ToDoList from '../components/ToDoList'
import DeleteAll from '../components/DeleteAll'

const ToDo = () => {
  const [todos, setTodos] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("todos"))
    return stored || []
  })

  const [storedTodos, setStoredTodos] = useState([])
  const [isFill, setIsFill] = useState(true)
  const inputRef = useRef(null)

  const addTodo = (event) => {
    event.preventDefault()
    const newTodo = inputRef.current.value

    if (newTodo && newTodo !== '') {
      setTodos([...todos, { id: uuidv4(), text: newTodo, completed: false }])
      localStorage.setItem('todos', JSON.stringify(todos))
      inputRef.current.value = ''
      setIsFill(true)
    }
  }

  const userInput = (value) => {
    if (value && value !== '') {
      setIsFill(false)
    }else{
      setIsFill(true)
    }
  }

  const deleteToDo = (id) => {
    if (id) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  const deleteAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTodos([])
      localStorage.removeItem('todos')
    }
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    const stored = JSON.parse(localStorage.getItem('todos'))
    if (stored) {
      const sorted = stored.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      })
      setStoredTodos(sorted)
    }
  }, [todos])
  
  return (
    <>
      <div className="flex flex-col items-center pt-10 min-h-screen dark:bg-gray-900">
        <Header />
        <div className="w-full max-w-md px-4">
          <ToDoForm 
            addTodo = {addTodo}
            inputRef = {inputRef}
            isFill = {isFill}
            userInput = {userInput}
          />
          {storedTodos && storedTodos.length !== 0 ? (
            <>
              <ToDoList
                storedTodos = {storedTodos}
                deleteToDo = {deleteToDo}
                setTodos={setTodos}
              />
              <DeleteAll
                deleteAll = {deleteAll}
              />
            </>
          ) : (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mx-1">
              No tasks here...
            </p>
          )}
        </div>
      </div>

    </>
  )
}

export default ToDo

