import { mockReads } from '@/app/user/home/components/mock-data';
import { ReadItem } from '@/app/user/home/components/types';

export const fetchOngoingComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
};

export const fetchCompletedComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
};

export const fetchHoldComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
};

export const fetchDroppedComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReads);
    }, 1000);
  });
};