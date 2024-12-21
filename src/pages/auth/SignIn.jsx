import { Button, Form, Input } from "antd"
import { useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../actions/actions"
import z from "zod"
import { useDispatch } from "react-redux"

export default function SignIn() {
  const { form } = Form.useForm()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const handleLogin = useCallback(
    (values) => {
      login(values)
        .then((user) => {
          setLoading(false)
          console.log(user)
          dispatch({ type: "SET_USER", payload: user })
          navigate("/")
        })
        .catch((err) => {
          if (err instanceof z.ZodError) {
            setError(err.flatten().fieldErrors)
          } else {
            setError({ error: err.message })
          }
        })
    },
    [navigate, dispatch]
  )

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-semibold py-8">Sign in</h1>

      <Form
        form={form}
        className="max-w-lg w-full px-4"
        onFieldsChange={() => setError(null)}
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
          name="email"
          className="w-full"
          {...(error?.email && {
            validateStatus: "error",
            help: error.email[0],
          })}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          className="w-full"
          name="password"
          {...(error?.password && {
            validateStatus: "error",
            help: error.password[0],
          })}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          className="w-full"
          {...(error?.error && { validateStatus: "error", help: error.error })}
        >
          <Button
            htmlType="submit"
            className="w-full"
            loading={loading}
            type="primary"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <p className="text-sm mb-8 mt-2">
        No account?{" "}
        <Link className="text-blue-500" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  )
}
