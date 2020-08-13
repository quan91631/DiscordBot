class AQueue {
  constructor(capacity) {
    this.data = []
    this.capacity = capacity
    this.size = 0
  }

  isFull() {
    return this.size === this.capacity
  }

  isEmpty() {
    return this.size === 0
  }

  enqueue(item) {
    if (this.isFull()) return false

    this.data.push(item)
    return true
  }

  dequeue() {
    if (this.isEmpty()) return undefined

    return this.data.shift()
  }

  front() {
    if (this.isEmpty()) return undefined

    return this.data[0]
  }

  rear() {
    if (this.isEmpty()) return undefined

    return this.data[this.size - 1]
  }

  clear() {
    this.data.length = 0
    this.size = 0
  }
}

module.exports = AQueue;
