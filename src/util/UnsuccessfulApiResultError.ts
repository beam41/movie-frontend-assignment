import { StatusResult } from '@/models/apiResult'

export class UnsuccessfulApiResultError extends Error {
  constructor(result: StatusResult) {
    super(result.status_message)
    this.message = result.status_message
  }
}

UnsuccessfulApiResultError.prototype.name = 'UnsuccessfulApiResultError'
