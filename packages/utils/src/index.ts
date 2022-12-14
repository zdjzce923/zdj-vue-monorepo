export function isObject(val: any) {
  return typeof val === 'object' && val !== null
}

export function isOn(key: string) {
  return key[0] === 'o' && key[1] === 'n'
}

let isFlushing = false
const p = Promise.resolve()
export function flushJob(jobQueue: Set<() => void>) {
  if (isFlushing) return
  // true 代表正在刷新
  isFlushing = true

  // 在微任务队列中刷新 jobQueue队列
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

export const objectToString = Object.prototype.toString
export function toTypeString (value: unknown): string {
  return objectToString.call(value)
}

export function toRawType(value: unknown): string {
  // [object RawType]
  return toTypeString(value).slice(8, -1)
}