export interface TaskRunnerConfig {
  concurrency?: number
}

type Task = () => Promise<void>

export class TaskRunner {
  private readonly concurrency: number

  private pending: Task[] = []

  private current: Task[] = []

  constructor({ concurrency = 3 }: TaskRunnerConfig = {}) {
    this.concurrency = concurrency
  }

  add(task: Task): void {
    this.pending.push(task)
    this.check()
  }

  private check(): void {
    if (this.current.length >= this.concurrency) return

    const task = this.pending.shift()

    if (task) this.run(task)
  }

  private async run(task: Task): Promise<void> {
    this.current.push(task)
    await task()
    this.current.splice(this.current.indexOf(task), 1)
    this.check()
  }
}
