import type { Response } from 'express'

export const failedResponse = (res: Response) => {
  return res.json({
    success: false,
  })
}
