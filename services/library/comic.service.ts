import { mockReads } from '@/app/user/home/components/mock-data';
import { ReadItem } from '@/app/user/home/components/types';

export const fetchOngoingComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads.filter((read) => {
        const typeMatch = types.length === 0 || types.includes(read.type);
        const statusMatch = read.status === "Ongoing";
        return typeMatch && statusMatch;
      });
      resolve(filteredReads);
    }, 1000);
  });
};

export const fetchCompletedComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads.filter((read) => {
        const typeMatch = types.length === 0 || types.includes(read.type);
        const statusMatch = read.status === "Completed";
        return typeMatch && statusMatch;
      });
      resolve(filteredReads);
    }, 1000);
  });
};

export const fetchHoldComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads.filter((read) => {
        const typeMatch = types.length === 0 || types.includes(read.type);
        const statusMatch = read.status === "On Hold";
        return typeMatch && statusMatch;
      });
      resolve(filteredReads);
    }, 1000);
  });
};

export const fetchDroppedComicByType = (types: string[]): Promise<ReadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReads = mockReads.filter((read) => {
        const typeMatch = types.length === 0 || types.includes(read.type);
        const statusMatch = read.status === "Dropped";
        return typeMatch && statusMatch;
      });
      resolve(filteredReads);
    }, 1000);
  });
};