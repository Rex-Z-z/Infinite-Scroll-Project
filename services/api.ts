import { mockReads } from '@/app/user/home/components/mock-data';
import { ReadItem } from '@/app/user/home/components/types';

export const fetchReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 2500);
  });
};