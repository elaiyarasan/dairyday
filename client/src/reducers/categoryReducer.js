// ** Initial State
const initialState = {
    data: null,
    allData:[]
  }
  
  const category = (state = initialState, action) => {
    switch (action.type) {   
      case 'GET_ALL_CATEGORY':
        return { ...state, allData: action.data } 
      case 'GET_CATEGORY':
        return { ...state, data: action.data } 
      default:
        return { ...state }
    }
  }
  export default category
  