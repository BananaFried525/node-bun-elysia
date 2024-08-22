import { JWTPayloadSpec } from '@elysiajs/jwt'

export type token = {
  reference: string
  scope: string
} & Record<string, string | number> & JWTPayloadSpec