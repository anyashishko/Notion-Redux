/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../actions/actions"

export default function AuthProvider({ children }) {
  const user = useSelector((state) => state.user)
  const isLoading = useSelector((state) => state.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user.id)
    } else if (!isLoading) {
      localStorage.removeItem("userId")
    }
  }, [user, isLoading])

  useEffect(() => {
    const setUser = (user) => dispatch({ type: "SET_USER", payload: user })

    const userId = localStorage.getItem("userId")
    if (userId) {
      fetchUser(userId)
        .then((user) => setUser(user))
        .catch(() => setUser(null))
    } else {
      setUser(null)
    }
  }, [dispatch])

  return <>{children}</>
}
