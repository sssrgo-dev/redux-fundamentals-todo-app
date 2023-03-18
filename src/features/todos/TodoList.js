// import React from 'react'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'
import { selectFilteredTodoIds, selectLoadingTodosStatus } from './todosSlice'

// const selectTotalCompletedTodos = (state) => {
//   const completedTodos = state.todos.filter((todo) => todo.completed)
//   return completedTodos.length
// }

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector(selectLoadingTodosStatus)

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader"></div>
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    // console.log(todoId)
    return <TodoListItem key={todoId} id={todoId}></TodoListItem>
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
