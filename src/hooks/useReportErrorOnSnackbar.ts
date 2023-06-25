import { appendSnackbar } from '@/store/snackbar/snackbarReducer'
import { useAppDispatch } from '@/store/store'
import {
  isConditionError,
  isErrorLike,
  isFetchAbortError,
} from '@/util/isError'

export function useReportErrorOnSnackbar() {
  const dispatch = useAppDispatch()

  return (error: unknown, message: string) => {
    if (isFetchAbortError(error)) return
    if (isConditionError(error)) return

    let reason = 'Unknown, check console for info'

    if (isErrorLike(error)) {
      reason = error.message
    } else if (typeof error === 'string') {
      reason = error
    }
    console.error(error)

    dispatch(
      appendSnackbar({
        message: `${message} (Reason: ${reason})`,
        color: 'error',
      }),
    )
  }
}
