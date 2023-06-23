import { ApiError } from '@/models/apiResult'

export type fetchResult<SuccessType, ErrorType = ApiError> =
  | [true, SuccessType]
  | [false, ErrorType]
