
export interface PageList<T> {
  size: number
  page: number
  totalElements: number
  countPages: number
  hasNext: boolean
  hasPrevious: boolean
  content: Array<T>
}