import { Provider } from "react-redux"
import { store } from "./store"
import { RouterProvider } from "react-router-dom"
import { router } from "../router/router"
import AuthProvider from "./AuthProvider"

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  )
}

export default App
