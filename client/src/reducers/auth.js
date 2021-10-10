
// 2. create user reducer function
export const authReducer = (state = {user:"dango", surname:"taz"}, action)=>{
    switch (action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload}
        
      case "LOGOUT":
        return action.payload; 
      default:
        return state;
    }
  } 

