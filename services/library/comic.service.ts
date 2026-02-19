import { mockReads } from '@/lib/mock-data'
import { ReadItem } from '@/lib/types'

// Replaces fetchOngoing..., fetchCompleted..., etc.
export const fetchComicsByFilters = (filters?: any): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Here you will eventually filter mockReads based on the passed filters (like status)
      resolve(mockReads)
    }, 1000)
  })
}

export const fetchComickById = (id: number): Promise<ReadItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comic = mockReads.find((item) => item.id === id)
      resolve(comic)
    }, 1000)
  })
}
