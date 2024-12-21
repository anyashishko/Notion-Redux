import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="max-w-sm w-full rounded-md p-2 border border-gray-200">
        <Outlet />
      </div>
    </div>
  )
}
