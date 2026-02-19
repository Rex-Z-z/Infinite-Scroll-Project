import React, { useEffect, useRef, useState } from "react";
import { ReadItem } from "@/lib/types";
import { formatDistanceToNow } from "@/lib/utils";
import {
	Book,
	BookOpen,
	Calendar as CalendarIcon,
	ImagePlus,
	ArrowLeftRight,
	Star,
	Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import LastReadDatePicker from "./lastread-datepicker";
import SwitchComicImage from "./switch-comic-image";

const ratingColorMap: { [key: string]: string } = {
	"Absolute Cinema": "bg-blue-400/30 text-blue-400 border border-blue-400",
	Awesome: "bg-emerald-300/30 text-emerald-300 border border-emerald-300",
	Great: "bg-green-600/30 text-green-600 border border-green-600",
	Good: "bg-yellow-400/30 text-yellow-400 border border-yellow-400",
	Regular: "bg-orange-400/30 text-orange-400 border border-orange-400",
	Bad: "bg-red-400/30 text-red-400 border border-red-400",
	Garbage: "bg-stone-500/30 text-stone-400 border border-stone-500",
};

const statusColorMap: { [key: string]: string } = {
	Ongoing: "bg-sky-500/30 text-sky-400 border border-sky-500",
	Completed: "bg-green-500/30 text-green-400 border border-green-500",
	"On Hold": "bg-amber-500/30 text-amber-400 border border-amber-500",
	Dropped: "bg-rose-500/30 text-rose-400 border border-rose-500",
	"Plan to watch":
		"bg-purple-500/30 text-purple-400 border border-purple-500",
};

const typeColorMap: { [key: string]: string } = {
	Manga: "bg-indigo-500/30 text-indigo-400 border border-indigo-500",
	Manhwa: "bg-cyan-500/30 text-cyan-400 border border-cyan-500",
	Manhua: "bg-orange-500/30 text-orange-400 border border-orange-500",
};

const LeftSidePage = ({
	comicId,
	data,
}: {
	comicId: string;
	data: ReadItem;
}) => {
	const [isEdit, setEdit] = useState(false);
	const [chapter, setChapter] = useState("");
	const [rating, setRating] = useState("");
	const [type, setType] = useState("");
	const [status, setStatus] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(
		data?.lastRead ? new Date(data.lastRead) : undefined,
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setChapter(String(data?.chapter || ""));
		setRating(data?.rating || "");
		setType(data?.type || "");
		setStatus(data?.status || "");

		if (data?.lastRead) {
			setDate(new Date(data.lastRead));
		}
	}, [data]);

	useEffect(() => {
		setDate(data?.lastRead ? new Date(data.lastRead) : undefined);
	}, [data]);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleEdit = () => {
		setEdit(!isEdit);
	};

	const handleSwitch = () => {
		setIsModalOpen(true);
	};

	const getLastReadDate = () => {
		if (data?.lastRead) {
			return `${formatDistanceToNow(data.lastRead)} (${data.lastRead})`;
		}
		return "N/A";
	};

	return (
		<div className="custom-scrollbar h-full w-75 flex-none flex-col overflow-y-auto pr-1">
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<SwitchComicImage
					currentCover={data?.coverImage}
					availableImages={data?.availableImages}
					onCoverUpdate={function (newCover: string): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</Dialog>

			{/* Cover */}
			<div className="group relative mb-3 block aspect-[2/3] h-99 w-full overflow-hidden rounded-md">
				{data.coverImage ? (
					<img
						src={data?.coverImage}
						alt={`Cover for ${data?.title}`}
						className="absolute h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
					/>
				) : (
					<>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
						/>
						<Button
							onClick={handleUploadClick}
							variant="outline"
							className="group hover:text-muted-foreground relative mb-3 flex aspect-[2/3] h-99 w-full items-center justify-center"
						>
							<ImagePlus className="text-muted-foreground size-18 transition-all duration-300 ease-in-out group-hover:scale-130" />
						</Button>
					</>
				)}
				<Button
					onClick={handleSwitch}
					variant="secondary"
					size="icon-sm"
					className="hover:bg-accent absolute top-2 left-2 hover:cursor-pointer"
				>
					<ArrowLeftRight />
				</Button>
			</div>

			{/* Info */}
			<div className="flex w-full flex-col gap-2">
				<div className="flex flex-row gap-1.5">
					<div
						className={`rounded-md p-2 ${typeColorMap[type] || "bg-card hover:bg-card/80 border-foreground/10 text-foreground/20 border"}`}
					>
						<Book className="size-5" />
					</div>
					<div className="w-full">
						{isEdit ? (
							<Select onValueChange={setType} value={type}>
								<SelectTrigger className="w-full py-4.5">
									<SelectValue placeholder="Select a type" />
								</SelectTrigger>
								<SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
									<SelectGroup>
										<SelectItem value="Manga">
											Manga
										</SelectItem>
										<SelectItem value="Manhwa">
											Manhwa
										</SelectItem>
										<SelectItem value="Manhua">
											Manhua
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						) : (
							<>
								<h2 className="text-muted-foreground text-[10px] font-semibold">
									Type
								</h2>
								<h1 className="text-sm font-semibold">
									{data?.type || "N/A"}
								</h1>
							</>
						)}
					</div>
				</div>

				<div className="flex flex-row gap-1.5">
					<div
						className={`rounded-md p-2 ${ratingColorMap[rating] || "dark:bg-blue-600 dark:hover:bg-blue-700"}`}
					>
						<Star className="size-5" />
					</div>
					<div className="w-full">
						{isEdit ? (
							<Select onValueChange={setRating} value={rating}>
								<SelectTrigger className="w-full py-4.5">
									<SelectValue placeholder="Select a rating" />
								</SelectTrigger>
								<SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
									<SelectGroup>
										<SelectItem value="Absolute Cinema">
											{" "}
											Absolute Cinema{" "}
										</SelectItem>
										<SelectItem value="Awesome">
											{" "}
											Awesome{" "}
										</SelectItem>
										<SelectItem value="Great">
											{" "}
											Great{" "}
										</SelectItem>
										<SelectItem value="Good">
											{" "}
											Good{" "}
										</SelectItem>
										<SelectItem value="Regular">
											{" "}
											Regular{" "}
										</SelectItem>
										<SelectItem value="Bad">
											{" "}
											Bad{" "}
										</SelectItem>
										<SelectItem value="Garbage">
											{" "}
											Garbage{" "}
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						) : (
							<>
								<h2 className="text-muted-foreground text-[10px] font-semibold">
									Rating
								</h2>
								<h1 className="text-sm font-semibold">
									{data?.rating || "N/A"}
								</h1>
							</>
						)}
					</div>
				</div>

				<div className="flex flex-row gap-1.5">
					<div
						className={`rounded-md p-2 ${statusColorMap[status] || "dark:bg-blue-600 dark:hover:bg-blue-700"}`}
					>
						<CalendarIcon className="size-5" />
					</div>
					<div className="w-full">
						{isEdit ? (
							<Select onValueChange={setStatus} value={status}>
								<SelectTrigger className="w-full py-4.5">
									<SelectValue placeholder="Select a rating" />
								</SelectTrigger>
								<SelectContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
									<SelectGroup>
										<SelectItem value="Ongoing">
											{" "}
											Ongoing{" "}
										</SelectItem>
										<SelectItem value="Completed">
											{" "}
											Completed{" "}
										</SelectItem>
										<SelectItem value="On Hold">
											{" "}
											On Hold{" "}
										</SelectItem>
										<SelectItem value="Plan to data">
											{" "}
											Plan to data{" "}
										</SelectItem>
										<SelectItem value="Dropped">
											{" "}
											Dropped{" "}
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						) : (
							<>
								<h2 className="text-muted-foreground text-[10px] font-semibold">
									Status
								</h2>
								<h1 className="text-sm font-semibold">
									{data?.status || "N/A"}
								</h1>
							</>
						)}
					</div>
				</div>

				<div className="flex flex-row gap-1.5">
					<div className="rounded-md border border-indigo-600 bg-indigo-600/30 p-2 text-indigo-500">
						<Book className="size-5" />
					</div>
					<div className="w-full">
						{isEdit ? (
							<Input
								className="py-4.5"
								type="number"
								placeholder="Chapter"
								value={chapter}
								onChange={(e) => setChapter(e.target.value)}
							/>
						) : (
							<>
								<h2 className="text-muted-foreground text-[10px] font-semibold">
									Chapter
								</h2>
								<h1 className="text-sm font-semibold">
									{data?.chapter || "N/A"}
								</h1>
							</>
						)}
					</div>
				</div>

				<div className="flex flex-row gap-1.5">
					<div className="rounded-md border border-violet-600 bg-violet-600/30 p-2 text-violet-500">
						<BookOpen className="size-5" />
					</div>
					<div className="w-full">
						{isEdit ? (
							<LastReadDatePicker date={date} setDate={setDate} />
						) : (
							<>
								<h2 className="text-muted-foreground text-[10px] font-semibold">
									Last read
								</h2>
								<h1 className="text-sm font-semibold">
									{getLastReadDate()}
								</h1>
							</>
						)}
					</div>
				</div>

				{isEdit ? (
					<div className="grid w-full grid-cols-2 gap-1.5">
						<Button
							onClick={handleEdit}
							className="w-full hover:cursor-pointer"
						>
							Save
						</Button>
						<Button
							onClick={handleEdit}
							variant="outline"
							className="w-full hover:cursor-pointer"
						>
							Cancel
						</Button>
					</div>
				) : (
					<div className="grid w-full grid-cols-2 gap-1.5">
						<Button
							onClick={handleEdit}
							className="w-full hover:cursor-pointer"
						>
							Edit
						</Button>
						<Button
							variant="destructive"
							className="w-full hover:cursor-pointer"
						>
							Delete
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default LeftSidePage;
