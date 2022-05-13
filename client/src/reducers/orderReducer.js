// ** Initial State
const initialState = {
    data: null,
    allData:[]
  }
  
  const order = (state = initialState, action) => {
    switch (action.type) {   
      case 'GET_ALL_ORDER':
        return { ...state, allData: action.data } 
      case 'GET_ORDER':
        return { ...state, data: action.data } 
      default:
        return { ...state }
    }
  }
  export default order
  