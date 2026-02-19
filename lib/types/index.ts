export interface ReadItem {
  id: number
  type: string
  coverImage: string
  availableImages: string[]
  title: string
  altTitle: string
  desc: string
  published: string
  updated: string
  lastRead: string
  status: string
  comicStatus: string
  rating: string
  chapter: number
  comicChapter: number
  tags: string[]
  category: string[]
  source: string[]
  sourceIcon: string[]
  sourceUrl: string[]
  relations: number[]
}
