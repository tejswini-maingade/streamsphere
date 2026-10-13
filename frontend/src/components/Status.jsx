export function Loading({ label = 'Loading' }) {
  return (
    <p className="status" role="status">
      {label}…
    </p>
  )
}

export function ErrorBox({ message, onRetry }) {
  return (
    <div className="status error-box" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}