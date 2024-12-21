/* eslint-disable react/prop-types */
import { Button } from "antd"
import clsx from "clsx"
import { connect } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"

const routes = [
  {
    path: "/",
    name: "About",
  },
  {
    path: "/notes",
    name: "Notes",
  },
]

function NavLinks() {
  const location = useLocation()

  return (
    <>
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={clsx(
            "hover:underline",
            location.pathname === route.path && "underline"
          )}
        >
          {route.name}
        </Link>
      ))}
    </>
  )
}

function Header({ user, logout }) {
  return (
    <div className="w-full">
      <div className="flex border border-gray-200 border-b mb-12">
        <div className="flex row container max-w-5xl py-4 px-8 mx-auto justify-between items-center">
          <p>Hello, {user.name}</p>
          <div className="flex row gap-4 items-baseline">
            <NavLinks />
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto px-8">
        <Outlet />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch({ type: "LOGOUT" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
