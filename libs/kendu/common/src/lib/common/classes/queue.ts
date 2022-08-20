export class Queue<T> {
  private firstItem: Node<T> | null = null

  private lastItem: Node<T> | null = null

  private _size = 0

  get size(): number {
    return this._size
  }

  enqueue(item: T): void {
    const newItem = Queue.createItem(item)

    if (this.isEmpty()) {
      this.firstItem = newItem
      this.lastItem = newItem
    } else {
      this.lastItem && (this.lastItem.next = newItem)
      this.lastItem = newItem
    }

    this._size += 1
  }

  dequeue(): T | null {
    let removedItem = null

    if (!this.isEmpty()) {
      removedItem = this.firstItem?.value ?? null
      this.firstItem = this.firstItem?.next ?? null
      this._size -= 1
    }

    return removedItem
  }

  isEmpty(): boolean {
    return this._size === 0
  }

  private static createItem<T>(value: T): Node<T> {
    return {
      next: null,
      value,
    }
  }
}

interface Node<T> {
  next: Node<T> | null
  value: T
}
