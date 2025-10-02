import { mockReads } from '@/lib/mock-data';
import { ReadItem } from '@/lib/types';

export const fetchAllReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
}

export const fetchRecentReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
}

export const fetchRecommendedReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
}