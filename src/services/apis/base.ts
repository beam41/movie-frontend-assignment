import { StatusResult } from '@/models/apiResult'

export type fetchResult<SuccessType, ErrorType = StatusResult> =
  | [true, SuccessType]
  | [false, ErrorType]
