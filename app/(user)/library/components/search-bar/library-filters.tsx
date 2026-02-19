"use client";

import React, { useState } from "react";
import { Filter, Calendar, Star, Book, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon } from "@/components/icons/custom-icons";

const GENRES = [
	"Action",
	"Adventure",
	"Comedy",
	"Drama",
	"Fantasy",
	"Horror",
	"Mystery",
	"Romance",
	"Sci-Fi",
	"Slice of Life",
	"Thriller",
	"Tragedy",
];

const RATINGS = [
	"Absolute Cinema",
	"Awesome",
	"Great",
	"Good",
	"Regular",
	"Bad",
	"Garbage",
];

export function LibraryFilters() {
	// --- State ---
	const [timePreset, setTimePreset] = useState("Recent"); // "Recent" | "7 Days" | ... | "Custom"

	// Custom Years
	const [startYear, setStartYear] = useState("2025");
	const [endYear, setEndYear] = useState("2025");

	// Type
	const [types, setTypes] = useState({
		manga: false,
		manhwa: false,
		manhua: false,
	});

	// Genres (Stored as a Set for easier toggling, or just an array)
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	// Ratings
	const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

	// --- Helpers ---
	const toggleGenre = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre)
				? prev.filter((g) => g !== genre)
				: [...prev, genre],
		);
	};

	const toggleRating = (rating: string) => {
		setSelectedRatings((prev) =>
			prev.includes(rating)
				? prev.filter((r) => r !== rating)
				: [...prev, rating],
		);
	};

	// Calculate active filters count
	const activeFilterCount = [
		timePreset !== "Recent",
		Object.values(types).some((t) => t),
		selectedGenres.length > 0,
		selectedRatings.length > 0,
	].filter(Boolean).length;

	const handleReset = () => {
		setTimePreset("Recent");
		setTypes({ manga: false, manhwa: false, manhua: false });
		setSelectedGenres([]);
		setSelectedRatings([]);
	};

	return (
		<Popover modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className="text-muted-foreground hover:text-foreground h-7 gap-2 px-2"
				>
					{activeFilterCount ? (
						<FilterIcon isFill className="text-primary size-4.5" />
					) : (
						<FilterIcon strokeWidth={1.7} className="size-4.5" />
					)}
					Filters
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[360px] p-0" align="end">
				{/* Header */}
				<div className="bg-muted/30 flex items-center justify-between px-4 py-3">
					<h4 className="text-sm font-semibold">Library Filters</h4>
					<Button
						variant="ghost"
						className="text-muted-foreground hover:text-primary h-auto p-0 text-xs"
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
				<Separator />

				<ScrollArea className="h-[480px]">
					<div className="space-y-6 p-4">
						{/* --- Type Section --- */}
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-sm font-semibold">
								<Book className="text-muted-foreground size-4" />
								Type
							</div>
							<div className="flex flex-wrap gap-2">
								{Object.entries(types).map(([key, value]) => (
									<div
										key={key}
										className={`cursor-pointer rounded-md border px-3 py-1 text-xs font-medium transition-colors select-none ${value ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground hover:bg-muted bg-transparent"} `}
										onClick={() =>
											setTypes((prev) => ({
												...prev,
												[key]: !prev[
													key as keyof typeof types
												],
											}))
										}
									>
										{key.charAt(0).toUpperCase() +
											key.slice(1)}
									</div>
								))}
							</div>
						</div>

						<Separator />

						{/* --- Genre Section (Grid Layout) --- */}
						<div className="custom-scrollbar h-[130px] space-y-3 overflow-auto">
							<div className="flex items-center gap-2 text-sm font-semibold">
								<Tag className="text-muted-foreground size-4" />
								Genres
							</div>
							<div className="grid grid-cols-2 gap-x-4 gap-y-2">
								{GENRES.map((genre) => (
									<div
										key={genre}
										className="flex items-center space-x-2"
									>
										<Checkbox
											id={`genre-${genre}`}
											checked={selectedGenres.includes(
												genre,
											)}
											onCheckedChange={() =>
												toggleGenre(genre)
											}
										/>
										<Label
											htmlFor={`genre-${genre}`}
											className="cursor-pointer text-xs font-normal"
										>
											{genre}
										</Label>
									</div>
								))}
							</div>
						</div>

						<Separator />

						{/* --- Time Section --- */}
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-sm font-semibold">
								<Calendar className="text-muted-foreground size-4" />
								Time & Relevance
							</div>
							<div className="grid grid-cols-2 gap-2">
								{[
									"Recent",
									"7 Days",
									"1 Month",
									"6 Months",
								].map((period) => (
									<Button
										key={period}
										variant={
											timePreset === period
												? "default"
												: "outline"
										}
										className="h-8 justify-start text-xs"
										onClick={() => setTimePreset(period)}
									>
										{period}
									</Button>
								))}
							</div>

							{/* Custom Range Toggle */}
							<Button
								variant={
									timePreset === "Custom"
										? "default"
										: "outline"
								}
								className="h-8 w-full text-xs"
								onClick={() => setTimePreset("Custom")}
							>
								Custom Year Range
							</Button>

							{timePreset === "Custom" && (
								<div className="animate-in fade-in zoom-in-95 flex items-center gap-2 pt-1 duration-200">
									<Select
										value={startYear}
										onValueChange={setStartYear}
									>
										<SelectTrigger className="h-8 w-full text-xs">
											<SelectValue placeholder="From" />
										</SelectTrigger>
										<SelectContent>
											{["2023", "2024", "2025"].map(
												(y) => (
													<SelectItem
														key={y}
														value={y}
													>
														{y}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
									<span className="text-muted-foreground text-xs">
										-
									</span>
									<Select
										value={endYear}
										onValueChange={setEndYear}
									>
										<SelectTrigger className="h-8 w-full text-xs">
											<SelectValue placeholder="To" />
										</SelectTrigger>
										<SelectContent>
											{["2023", "2024", "2025"].map(
												(y) => (
													<SelectItem
														key={y}
														value={y}
													>
														{y}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								</div>
							)}
						</div>

						<Separator />

						{/* --- Rating Section --- */}
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-sm font-semibold">
								<Star className="size-4" />
								Rating
							</div>
							<div className="space-y-2">
								{RATINGS.map((rating) => (
									<div
										key={rating}
										className="flex items-center space-x-2"
									>
										<Checkbox
											id={`rating-${rating}`}
											checked={selectedRatings.includes(
												rating,
											)}
											onCheckedChange={() =>
												toggleRating(rating)
											}
										/>
										<Label
											htmlFor={`rating-${rating}`}
											className="cursor-pointer text-sm font-normal"
										>
											{rating}
										</Label>
									</div>
								))}
							</div>
						</div>
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
