import { Button } from "antd"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-neutral-500">Page not found</p>

      <Button type="primary" className="mt-4" onClick={() => navigate("/")}>
        Go home
      </Button>
    </div>
  )
}
