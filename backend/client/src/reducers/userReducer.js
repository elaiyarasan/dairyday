// ** Initial State
const initialState = {
    data: null,
    allData:[],
    regData:null
  }
  
  const users = (state = initialState, action) => {
    switch (action.type) {   
      case 'SET_USER':
        return { ...state, data: action.data } 
      case 'GET_USER':
        return { ...state, data: action.data } 
      case 'GET_ALL_USERS':
        return { ...state, allData: action.data } 
      case 'GET_REG_USER':
        return { ...state, regData: action.data } 
      default:
        return { ...state }
    }
  }
  export default users
  