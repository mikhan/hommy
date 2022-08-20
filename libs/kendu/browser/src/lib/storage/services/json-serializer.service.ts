import { Injectable } from '@angular/core'
import { Serializer } from '../interfaces/serializer'

@Injectable({ providedIn: 'root' })
export class JsonSerializerService<T = any> implements Serializer<T> {
  serialize(value: any): string {
    return JSON.stringify(value)
  }

  unserialize<T>(value: string): T | undefined {
    try {
      return JSON.parse(value)
    } catch {
      return
    }
  }
}
