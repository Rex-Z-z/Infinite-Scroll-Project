export interface ReadItem {
  id: number;
  type: string;
  imageUrl: string;
  title: string;
  altTitle: string;
  desc: string;
  lastRead: string;
  status: string;
  rating: string;
  chapter: number;
  tags: string[];
  source: string[];
  sourceIcon: string[];
}