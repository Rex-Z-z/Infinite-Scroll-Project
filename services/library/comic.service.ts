import { mockReads } from "@/lib/mock-data";
import { ReadItem } from "@/lib/types";

export const fetchOngoingComicByType = (): Promise<ReadItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReads);
		}, 1000);
	});
};

export const fetchCompletedComicByType = (): Promise<ReadItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReads);
		}, 1000);
	});
};

export const fetchHoldComicByType = (): Promise<ReadItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReads);
		}, 1000);
	});
};

export const fetchDroppedComicByType = (): Promise<ReadItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReads);
		}, 1000);
	});
};

export const fetchPlanToReadComicByType = (): Promise<ReadItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReads);
		}, 1000);
	});
};

export const fetchComickById = (id: number): Promise<ReadItem | undefined> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const comic = mockReads.find((item) => item.id === id);
			resolve(comic);
		}, 1000);
	});
};
