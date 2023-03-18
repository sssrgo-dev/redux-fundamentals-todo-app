import {
  applyMiddleware,
  // compose,
  createStore,
} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import rootReducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer)

export default store
