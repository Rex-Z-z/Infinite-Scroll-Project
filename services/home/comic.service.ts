import { mockReads } from '@/app/user/home/components/mock-data';
import { ReadItem } from '@/app/user/home/components/types';

export const fetchAllReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads
        .filter((read) => {
          const statusMatch = read.status === "Ongoing";
          return statusMatch;
        })
      resolve(filteredReads);
    }, 1000);
  });
}

export const fetchRecentReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads
        .filter((read) => {
          const statusMatch = read.status === "Ongoing";
          return statusMatch;
        })
        .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
      resolve(filteredReads);
    }, 1000);
  });
}

export const fetchRecommendedReads = (): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads
        .filter((read) => {
          const statusMatch = read.status === "Completed";
          return statusMatch;
        })
        .sort((a, b) => new Date(a.lastRead).getTime() - new Date(b.lastRead).getTime());
      resolve(filteredReads);
    }, 1000);
  });
}