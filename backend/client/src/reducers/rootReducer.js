// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
// import auth from './auth'
// import navbar from './navbar'
// import layout from './layout'
// import users from '@src/views/pages/user/store/reducer'
// import password from '@src/views/pages/authentication/store/reducer'

// Changed True
import users from './userReducer'
import category from './categoryReducer'
import product from './productReducer'
import order from './orderReducer'

const rootReducer = combineReducers({
//   auth,
  users,
  category,
  product,
  order
//   navbar,
//   layout,
//   password,
//   profile
})

export default rootReducer


