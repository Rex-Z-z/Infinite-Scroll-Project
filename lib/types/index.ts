export interface ReadItem {
  id: number;
  type: string;
  imageUrl: string[];
  title: string;
  altTitle: string;
  desc: string;
  published: string;
  updated: string;
  lastRead: string;
  status: string;
  comicStatus: string;
  rating: string;
  chapter: number;
  comicChapter: number;
  tags: string[];
  category: string[];
  source: string[];
  sourceIcon: string[];
  relations: number[];
}