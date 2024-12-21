import { legacy_createStore as createStore } from "redux"

const initialState = {
  user: null,
  isLoading: true,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
      }
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload.sort((a, b) => b.date - a.date),
      }
    default:
      return state
  }
}

export const store = createStore(reducers)
