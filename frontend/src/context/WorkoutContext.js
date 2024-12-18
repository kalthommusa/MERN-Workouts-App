import { createContext, useReducer } from 'react'

// create the Workouts context
export const WorkoutsContext = createContext()

// reducer function to handle crud actions
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': 
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_WORKOUT': 
      return {
        workouts: state.workouts.map((w) => 
          w._id === action.payload._id ? action.payload : w
        )
      }
    default:
      return state
  }
}

// WorkoutsContext provider component
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  // console.log('WorkoutsContext state:', state) 
  
  // provide workouts context to child components
  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      { children }
    </WorkoutsContext.Provider>
  )
}