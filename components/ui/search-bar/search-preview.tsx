import React from "react";
import Image from "next/image";
import { X, Clock, Search } from "lucide-react";
import { ReadItem } from "@/lib/types";

interface SearchPreviewProps {
	results: ReadItem[];
	history: string[];
	isSearching: boolean;
	onSelectResult: (item: ReadItem) => void;
	onSelectHistory: (query: string) => void;
	onClearHistory: () => void;
}

const SearchPreview = ({
	results,
	history,
	isSearching,
	onSelectResult,
	onSelectHistory,
	onClearHistory,
}: SearchPreviewProps) => {
	return (
		<div className="bg-card absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-md border shadow-lg">
			{/* Show History when not searching (query is empty) */}
			{!isSearching && (
				<div className="p-2">
					<div className="text-muted-foreground flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase">
						<span>Recent Searches</span>
						{history.length > 0 && (
							<button
								onClick={onClearHistory}
								className="transition-colors hover:text-red-500"
							>
								Clear All
							</button>
						)}
					</div>
					{history.length === 0 ? (
						<div className="text-muted-foreground px-3 py-4 text-center text-sm">
							No recent searches
						</div>
					) : (
						<ul>
							{history.map((term, index) => (
								<li
									key={index}
									onClick={() => onSelectHistory(term)}
									className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm"
								>
									<Clock className="text-muted-foreground h-4 w-4" />
									<span>{term}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			)}

			{/* Show Search Results when searching */}
			{isSearching && (
				<div className="p-2">
					<div className="text-muted-foreground px-3 py-2 text-xs font-semibold uppercase">
						Results
					</div>
					{results.length === 0 ? (
						<div className="text-muted-foreground px-3 py-4 text-center text-sm">
							No results found.
						</div>
					) : (
						<ul>
							{results.map((item) => (
								<li
									key={item.id}
									onClick={() => onSelectResult(item)}
									className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2"
								>
									{/* Image Thumbnail */}
									<div className="relative h-28 w-24 shrink-0 overflow-hidden rounded">
										<Image
											src={item.coverImage}
											alt={item.title}
											fill
											className="object-cover"
										/>
									</div>

									{/* Text Info */}
									<div className="gap-A flex flex-col overflow-hidden">
										<span className="truncate text-sm font-medium">
											{item.title}
										</span>
										<span className="text-muted-foreground/60 truncate text-xs">
											{item.altTitle}
										</span>
										<span className="text-muted-foreground mt-0.5 text-sm font-medium">
											Chapter {item.chapter}
										</span>
										<span className="text-primary mt-0.5 text-xs">
											{item.type} • {item.rating}
										</span>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchPreview;
