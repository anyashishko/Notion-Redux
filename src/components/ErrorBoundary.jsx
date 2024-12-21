import { Button } from "antd"

/* eslint-disable react/prop-types */
export default function ErrorBoundary() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">An error occurred</h1>
      <p className="text-neutral-500">Please try again</p>
      <Button
        type="default"
        className="mt-4 w-fit"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </div>
  )
}
