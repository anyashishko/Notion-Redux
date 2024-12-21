/* eslint-disable react/prop-types */
import { Button } from "antd"
import { useCallback } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

function Home({ user }) {
  const navigate = useNavigate()
  const handleAllNotesClick = useCallback(() => navigate("/notes"), [navigate])

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-semibold mb-2">About me</h1>

      <p className="text-neutral-500">
        Name: <span className="text-black">{user.name}</span>
      </p>
      <p className="text-neutral-500">
        Email: <span className="text-black">{user.email}</span>
      </p>
      <p className="text-neutral-500">
        Signup date:{" "}
        <span className="text-black">
          {new Date(user.signupDate).toDateString()}
        </span>
      </p>

      <Button
        type="primary"
        className="w-fit mt-4"
        onClick={handleAllNotesClick}
      >
        All notes
      </Button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Home)
