export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2')
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      console.log('Added a new todo: ', action.payload)
    }, 1000)
  }
  console.log('next', next)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  console.log('result', result)
  return result
}
