"use client";

import React from "react";
import useSWR from "swr";
import { fetchComickById } from "@/services/library/comic.service";
import SkeletonDetails from "./skeleton";
import LeftSidePage from "./left-side-page-info";
import RightSidePage from "./right-side-page-info";

const PageInfo = ({ comicId }: { comicId: string }) => {
	const fetcher = () => fetchComickById(Number(comicId));
	const { data: read, isLoading, error } = useSWR(["read", comicId], fetcher);

	if (isLoading)
		return (
			<div className="p-4">
				<SkeletonDetails />
			</div>
		);
	if (error || !read) return <div className="p-4 text-red-500">Error...</div>;

	return (
		<div className="flex flex-row gap-4 p-4 h-[calc(95vh-2rem)] overflow-hidden">
			<LeftSidePage comicId={comicId} data={read} />
			<RightSidePage comicId={comicId} data={read} />
		</div>
	);
};

export default PageInfo;
