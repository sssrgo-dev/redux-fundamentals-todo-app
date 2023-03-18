import { client } from '../../api/client'

import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const inititalState = { status: 'idle', entities: {} }

// function nextTodoId(todos) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }

export default function todosReducer(state = inititalState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      const todo = action.payload
      return {
        ...state,
        entities: { ...state.entities, [todo.id]: action.payload },
      }
    }
    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      }
    }

    case 'todo/todoDeleted': {
      const newEntities = { ...state.entities }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities,
      }
    }

    case 'todos/allCompleted': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach((todo) => {
        newEntities[todo.id] = {
          ...todo,
          completed: true,
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }

    case 'todo/completedCleared': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach((todo) => {
        if (todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }

    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      return { ...state, status: 'idle', entities: newEntities }
    }

    default:
      return state
  }
}

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

const todosLoading = () => ({
  type: 'todos/todosLoading',
})

export const fetchTodos = () => async (dispatch) => {
  dispatch(todosLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}

export const todoAdded = (todo) => ({ type: 'todos/todoAdded', payload: todo })

export const selectTodoEntities = (state) => state.todos.entities
export const todoIdsFromList = (todos) => todos.map((todo) => todo.id)
export const selectTodoById = (state, todoId) =>
  selectTodoEntities(state)[todoId]

export const selectFilters = (state) => state.filters

export const selectLoadingTodosStatus = (state) => state.todos.status

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

export const selectTodoIds = createSelector(selectTodoEntities, todoIdsFromList)

export const selectFilteredTodos = createSelector(
  selectTodoEntities,
  selectFilters,

  (todos, filters) => {
    const newTodos = { ...todos }
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return newTodos
    }

    const completedStatus = status === StatusFilters.Completed

    Object.values(newTodos).forEach(({ completed, color, id }) => {
      const statusMatches = showAllCompletions || completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(color)
      if (!(statusMatches && colorMatches)) {
        delete newTodos[id]
      }
    })
    return newTodos
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => Object.values(filteredTodos).map((todo) => todo.id)
)
