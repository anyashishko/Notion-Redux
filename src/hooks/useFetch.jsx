import { useEffect, useState } from "react"

export function useFetch(setData, promise, ...args) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    promise(...args)
      .catch(setError)
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
  }, [])

  return { isLoading }
}
