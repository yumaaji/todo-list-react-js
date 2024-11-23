const ToDoList = ({storedTodos, deleteToDo, setTodos}) => {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {storedTodos.map((todo, index) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between px-4 py-2 shadow-md bg-gray-700 transition-all duration-300 border-2 border-gray-100 rounded-sm dark:border-gray-700`}
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
            <span
              className={`${
                todo.completed
                  ? "line-through dark:text-gray-500"
                  : "dark:text-white"
              } text-xs`}
            >
              {index + 1}. {todo.text}
            </span>
          </label>
          <button
            onClick={() => deleteToDo(todo.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg cursor-pointer transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ToDoList