import React, { useState } from "react";
import Link from "next/link";
import { ReadItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";
import { mockReads } from "@/lib/mock-data";
import { Dialog } from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import SourceEdit from "./source-edit";

const RightSidePage = ({
	comicId,
	data,
}: {
	comicId: string;
	data: ReadItem;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [copiedField, setCopiedField] = useState<"title" | "alt" | null>(
		null,
	);
	const [isTitleTooltipOpen, setIsTitleTooltipOpen] = useState(false);
	const [isAltTooltipOpen, setIsAltTooltipOpen] = useState(false);

	const handleCopy = (text: string, field: "title" | "alt") => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		setCopiedField(field);

		// Ensure the tooltip stays open immediately after click
		if (field === "title") setIsTitleTooltipOpen(true);
		if (field === "alt") setIsAltTooltipOpen(true);

		setTimeout(() => setCopiedField(null), 2000);
	};

	const handleSourceEdit = () => {
		setIsModalOpen(true);
	};

	const TRUNCATE_LENGTH = 350;
	const needsTruncation = data?.desc && data.desc.length > TRUNCATE_LENGTH;

	const relatedComics = mockReads.filter((comic) =>
		data?.relations?.includes(comic.id),
	);

	return (
		<TooltipProvider>
			<div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto pr-4">
				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<SourceEdit
						source={data?.source}
						sourceIcon={data?.sourceIcon}
						sourceUrl={data?.sourceUrl}
					/>
				</Dialog>

				{/* Top Section */}
				<div className="flex flex-col gap-2">
					{/* Title & Alt Title */}
					<div>
						{/* Main Title */}
						<Tooltip
							open={copiedField === "title" || isTitleTooltipOpen}
							onOpenChange={setIsTitleTooltipOpen}
						>
							<TooltipTrigger asChild>
								<h1
									onClick={() =>
										handleCopy(data?.title, "title")
									}
									className="line-clamp-2 w-fit cursor-pointer text-3xl font-semibold transition-colors"
									title={data?.title}
								>
									{data?.title}
								</h1>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{copiedField === "title"
										? "Copied!"
										: "Click to copy"}
								</p>
							</TooltipContent>
						</Tooltip>

						{/* Alt Title */}
						{data?.altTitle && (
							<Tooltip
								open={copiedField === "alt" || isAltTooltipOpen}
								onOpenChange={setIsAltTooltipOpen}
							>
								<TooltipTrigger asChild>
									<h2
										onClick={() =>
											handleCopy(data?.altTitle, "alt")
										}
										className="text-muted-foreground line-clamp-1 w-fit cursor-pointer text-lg font-semibold transition-colors"
										title={data?.altTitle}
									>
										{data?.altTitle}
									</h2>
								</TooltipTrigger>
								<TooltipContent>
									<p>
										{copiedField === "alt"
											? "Copied!"
											: "Click to copy"}
									</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>

					{/* Tags */}
					<div className="flex flex-row gap-1.5">
						{data?.tags?.map((tag) => (
							<Badge
								key={tag}
								variant="default"
								className="hover:bg-primary/80 rounded-2xl px-2.5 py-1.5"
							>
								{tag}
							</Badge>
						))}
					</div>

					<div className="mt-2">
						<h1 className="mb-1 text-lg font-semibold">
							More Info
						</h1>
						<div className="flex flex-col gap-1">
							<p className="text-muted-foreground text-sm font-semibold">
								Published:{" "}
								<span className="text-foreground">
									{data?.published || "N/A"}
								</span>{" "}
							</p>
							<p className="text-muted-foreground text-sm font-semibold">
								Updated:{" "}
								<span className="text-foreground">
									{data?.updated || "N/A"}
								</span>
							</p>
							<p className="text-muted-foreground text-sm font-semibold">
								Status:{" "}
								<span className="text-foreground">
									{data?.status || "N/A"}
								</span>
							</p>
							<p className="text-muted-foreground text-sm font-semibold">
								Chapter:{" "}
								<span className="text-foreground">
									{data?.comicChapter || "N/A"}
								</span>
							</p>
						</div>
					</div>

					{/* Description */}
					<div className="mt-2">
						<h1 className="text-md font-semibold">Description</h1>
						<p
							className={cn(
								"text-muted-foreground text-sm font-semibold",
								needsTruncation &&
									!isExpanded &&
									"line-clamp-3",
							)}
						>
							{data?.desc}
						</p>
						{needsTruncation && (
							<Button
								variant="link"
								onClick={() => setIsExpanded(!isExpanded)}
								className="text-primary p-0 text-sm font-semibold hover:cursor-pointer hover:underline"
							>
								{isExpanded ? "Show Less" : "Show More"}
							</Button>
						)}
					</div>
				</div>

				{/* Bottom Section */}
				<div className="flex flex-col gap-4">
					{/* Source */}
					<div className="mt-2">
						<h1 className="text-md mb-1 font-semibold">Source</h1>
						<div className="flex gap-2">
							<div className="flex flex-row gap-1.5">
								{data?.source?.map((source, index) => (
									<Link
										target="_blank"
										href={data.sourceUrl[index]}
										key={source}
									>
										<Badge
											key={source}
											variant="secondary"
											className="hover:bg-accent rounded-2xl px-2.5 py-[6.5px]"
										>
											<img
												src={data.sourceIcon[index]}
												alt={`${source} logo`}
												className="size-4 rounded-full"
											/>
											{source}
										</Badge>
									</Link>
								))}
							</div>

							<Button
								onClick={handleSourceEdit}
								size="icon-sm"
								variant="secondary"
								className="rounded-full"
							>
								<Plus />
							</Button>
						</div>
					</div>

					{/* Relation */}
					{relatedComics.length > 0 && (
						<div>
							<h1 className="text-md mb-1 font-semibold">
								Relation
							</h1>
							<div className="scrollbar-hide flex flex-row gap-3 overflow-x-auto pb-2">
								{relatedComics.map((comic) => (
									<Link
										key={comic.id}
										href={`/library/${comic.id}`}
									>
										<div
											key={comic.id}
											className="group flex w-32 flex-none cursor-pointer flex-col gap-2"
										>
											<div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-md">
												{comic.coverImage ? (
													<img
														src={comic.coverImage}
														alt={comic.title}
														className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
													/>
												) : (
													<div className="flex h-full items-center justify-center">
														<Image className="text-muted-foreground" />
													</div>
												)}
											</div>
											<span className="text-muted-foreground group-hover:text-primary line-clamp-2 text-xs font-medium transition-colors">
												{comic.title}
											</span>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}

					{/* Tags */}
					<div>
						<h1 className="text-md mb-2.5 font-semibold">Tags</h1>
						<div className="flex flex-row gap-1.5">
							{data?.category?.map((category) => (
								<Badge
									key={category}
									variant="secondary"
									className="hover:bg-accent rounded-md px-2.5 py-1.5"
								>
									{category}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default RightSidePage;
