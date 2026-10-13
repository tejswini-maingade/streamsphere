import { useCallback, useEffect, useState } from 'react'

// Runs an async function and tracks loading, success and error.
// The function gets an AbortSignal so outdated requests are cancelled.
export function useAsync(fn, deps) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null, error: null })
    fn(controller.signal).then(
      (data) => setState({ status: 'success', data, error: null }),
      (error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null, error })
      },
    )
    return () => controller.abort()
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])
  return { ...state, retry }
}