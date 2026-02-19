"use client";

import React, { useState } from "react";
import useSWR from "swr";
import SectionSkeleton from "@/components/ui/section-skeleton";
import ComicCard from "@/components/ui/comic-card";
import { fetchDroppedComicByType } from "@/services/library/comic.service";
import { ReadItem } from "@/lib/types";
import { Dialog } from "@/components/ui/dialog";
import AddNewModal from "../../../../components/ui/add-new-modal";

const fetcher = () => fetchDroppedComicByType();

const Dropped = () => {
	const {
		data: libraryReads,
		error,
		isLoading,
	} = useSWR(["dropped"], fetcher);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingComic, setEditingComic] = useState<ReadItem | null>(null);

	const handleEdit = (read: ReadItem) => {
		setEditingComic(read);
		setIsModalOpen(true);
	};

	return (
		<div>
			{isLoading && <SectionSkeleton page="library" />}
			{error && <p className="text-red-500">{error}</p>}

			<div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<AddNewModal comicData={editingComic} />
				</Dialog>

				{!isLoading &&
					!error &&
					libraryReads &&
					libraryReads.map((read) => (
						<ComicCard
							key={read.id}
							read={read}
							page="library"
							onEdit={handleEdit}
						/>
					))}
			</div>
		</div>
	);
};

export default Dropped;
