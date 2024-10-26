import { createContext, useReducer, useEffect } from 'react'

// create the Auth context
export const AuthContext = createContext() 

// reducer function to handle authentication actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload } // update state with user data on login
    case 'LOGOUT':
      return { user: null } // clear user data on logout
    default:
      return state // return current state for unrecognized actions
  }
}

// authContext provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null 
  })

   // check local storage for user data (email and token) on initial render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  // console.log('AuthContext state:', state) 
  
  // provide auth context to child components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}