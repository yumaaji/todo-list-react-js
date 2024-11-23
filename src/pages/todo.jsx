import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
    <div className="flex flex-col items-center pt-10 min-h-screen  dark:bg-gray-900">
      <div className="mb-4">
        <section className="bg-white dark:bg-gray-900 w-full">
          <div className="max-w-3xl pt-16 mb-3 mx-auto text-center">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">To Do List</h1>
              <p className="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">Remember what you need to do!</p>
              <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400">Stay creative and be productive</p>
              <form onSubmit={addTodo} className="flex gap-2 justify-center w-full">
                <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                  <input 
                    type="text" 
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-80"
                    ref={inputRef}
                    placeholder="Add a new task" onChange={(e) => userInput(e.target.value !== '')}/>

                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    disabled={isFill}
                  >
                      Add
                  </button>
                </div>
              </form>
          </div>
        </section>
      </div>
      <div className="w-full max-w-md flex flex-col items-center">
        {
          storedTodos && storedTodos.length !== 0 ? (
            <>
              <ul className="flex justify-center flex-col gap-2 w-full py-3">
                {storedTodos &&
                  storedTodos.map((todo, index) => (
                    <li
                      key={todo.id}
                      className={`flex items-center justify-between flecre px-4 py-2  shadow-md bg-gray-700 transition-all duration-300 border-2 border-gray-100 rounded-lg dark:border-gray-700 mx-3`}
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          onChange={() =>
                            setTodos(
                              storedTodos.map((t) =>
                                t.id === todo.id
                                  ? { ...t, completed: !t.completed }
                                  : t
                              )
                            )
                          }
                          checked={todo.completed}
                          className="cursor-pointer w-4 h-4 border-2 border-gray-300 rounded-lg checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition-all duration-200 transform hover:scale-110"
                        />
                        <span className={`${todo.completed ? "line-through text-gray-500" : ""} font-semibold text-gray-700 dark:text-white`}>{index + 1}. {todo.text}</span>
                      </label>
                      <button
                        onClick={() => deleteToDo(todo.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg cursor-pointer transition-all duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path>
                        </svg>
                      </button>
                      
                    </li>
                  ))}
              </ul>
              <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-40 mt-4' onClick={deleteAll}>Delete All</button>
            </>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <span className="w-3 border-b dark:border-gray-600"></span>
              <p className='text-xs text-center text-gray-500 dark:text-gray-400 mx-1'>No tasks here</p>
              <span className="w-3 border-b dark:border-gray-600"></span>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default ToDo

