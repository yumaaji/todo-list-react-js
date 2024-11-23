const ToDoForm = ({addTodo, inputRef, isFill, userInput}) => {
  return (
    <form onSubmit={addTodo} className="flex flex-col gap-2 justify-center mb-4 sm:flex-row">
      <input
        type="text"
        className="px-4 py-2 w-full text-gray-700 bg-slate-400 border rounded-sm dark:bg-gray-900 dark:text-gray-300 focus:none"
        ref={inputRef}
        placeholder="Add a new task"
        onChange={(e) => userInput(e.target.value !== '')}
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={isFill}
      >
        Add
      </button>
    </form>
  )
}

export default ToDoForm