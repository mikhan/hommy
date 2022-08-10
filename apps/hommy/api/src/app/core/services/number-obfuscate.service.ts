import { Injectable } from '@nestjs/common'
import Hashids from 'hashids'

@Injectable()
export class NumberObfuscateService {
  hashids: Hashids

  constructor() {
    this.hashids = new Hashids(undefined, 12)
  }

  encode(value: number): string {
    return this.hashids.encode(value)
  }

  decode(value: string): number {
    return this.hashids.decode(value)[0] as number
  }
}
