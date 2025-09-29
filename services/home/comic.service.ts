import { mockReads } from '@/app/user/home/components/mock-data';
import { ReadItem } from '@/app/user/home/components/types';

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