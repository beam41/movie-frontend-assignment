export function isConditionError(
  error: unknown,
): error is Error & { name: 'ConditionError' } {
  return (
    error instanceof Object &&
    'name' in error &&
    error.name === 'ConditionError'
  )
}

export function isFetchAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function isErrorLike(error: unknown): error is Error {
  return error instanceof Object && 'name' in error && 'message' in error
}
