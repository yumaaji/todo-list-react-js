const DeleteAll = ({deleteAll}) => {
  return (
    <button
      className="rounded-sm bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full mt-4"
      onClick={deleteAll}
    >
      Delete All
    </button>
  )
}

export default DeleteAll