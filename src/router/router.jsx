import { createBrowserRouter } from "react-router-dom"
import SignIn from "../pages/auth/SignIn"
import Signup from "../pages/auth/Signup"
import Home from "../pages/main/Home"
import Notes from "../pages/main/Notes"
import Note from "../pages/main/Note"
import EditNote from "../pages/main/EditNote"
import CreateNote from "../pages/main/CreateNote"
import ProtectedRoute from "../components/ProtectedRoute"
import Header from "../components/Header"
import NotFound from "../pages/NotFound"
import ErrorBoundary from "../components/ErrorBoundary"
import AuthLayout from "../components/AuthLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Header />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home />, ErrorBoundary },
      { path: "/notes", element: <Notes />, ErrorBoundary },
      { path: "/note/:id", element: <Note />, ErrorBoundary },
      { path: "/edit/:id", element: <EditNote />, ErrorBoundary },
      { path: "/create", element: <CreateNote />, ErrorBoundary },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
