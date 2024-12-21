/* eslint-disable react/prop-types */

import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ user, isLoading, children }) {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="signin" />
  }

  return <div>{children}</div>
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
