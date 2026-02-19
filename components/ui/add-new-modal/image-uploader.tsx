"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Clipboard, Trash2 } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "../dialog";
import { ReadItem } from "@/lib/types";
import Tooltip2 from "../tooltip-v2";

interface ImageUploaderProps {
	initialImageUrl: string | null;
	comicData: ReadItem | null;
}

export const ImageUploader = React.memo(
	({ initialImageUrl, comicData }: ImageUploaderProps) => {
		const [imagePreview, setImagePreview] = useState<string | null>(null);
		const [showNoImageTooltip, setShowNoImageTooltip] = useState(false);
		const fileInputRef = useRef<HTMLInputElement>(null);

		useEffect(() => {
			setImagePreview(initialImageUrl);
		}, [initialImageUrl]);

		const handleImageChange = (
			event: React.ChangeEvent<HTMLInputElement>,
		) => {
			const file = event.target.files?.[0];
			if (file) {
				setImagePreview(URL.createObjectURL(file));
			}
		};

		const handleUploadClick = () => {
			fileInputRef.current?.click();
		};

		const handleClearImage = () => {
			setImagePreview(null);
		};

		const handlePasteImage = async () => {
			try {
				const clipboardItems = await navigator.clipboard.read();
				let imageFound = false;
				for (const item of clipboardItems) {
					if (item.types.some((type) => type.startsWith("image/"))) {
						const blob = await item.getType(
							item.types.find((type) =>
								type.startsWith("image/"),
							)!,
						);
						setImagePreview(URL.createObjectURL(blob));
						imageFound = true;
						break;
					}
				}
				if (!imageFound) {
					setShowNoImageTooltip(true);
					setTimeout(() => setShowNoImageTooltip(false), 2000);
				}
			} catch (error) {
				console.error("Failed to read clipboard contents: ", error);
				setShowNoImageTooltip(true);
				setTimeout(() => setShowNoImageTooltip(false), 2000);
			}
		};

		return (
			<div className="flex flex-row gap-3">
				<div className="group relative block h-52 w-36 flex-shrink-0">
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleImageChange}
						className="hidden"
						accept="image/*"
					/>
					{imagePreview ? (
						<>
							<img
								src={imagePreview}
								alt="Cover Preview"
								className="h-full w-full rounded-md object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="flex flex-row gap-2 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
									<Button
										onClick={handleUploadClick}
										className="px-2 py-1 text-xs"
									>
										<Upload className="size-3.5" />
									</Button>
									<Button
										variant="destructive"
										onClick={handleClearImage}
										className="!bg-destructive !hover:bg-destructive/80 px-2 py-1 text-xs"
									>
										<Trash2 className="text-foreground size-3.5" />
									</Button>
								</div>
							</div>
						</>
					) : (
						<div className="bg-card flex h-full w-full flex-col items-center justify-center gap-2 rounded-md border">
							<div className="flex flex-row gap-2">
								<Button
									variant="default"
									onClick={handleUploadClick}
								>
									<Upload className="size-4" />
								</Button>
							</div>
						</div>
					)}
				</div>

				<div className="flex w-full flex-col gap-4">
					<DialogHeader>
						<DialogTitle>
							{comicData ? "Edit Comic" : "Add New Comic"}
						</DialogTitle>
						<DialogDescription className="mt-2 flex flex-col font-semibold">
							{comicData
								? "Edit the details of your comic."
								: "Add a new comic to your collection."}
							<div className="relative inline-block">
								<Button
									variant="outline"
									onClick={handlePasteImage}
									className="mt-2 text-xs"
								>
									<Clipboard className="size-3.5" />
									Paste
								</Button>
								{showNoImageTooltip && (
									<Tooltip2>No image on clipboard</Tooltip2>
								)}
							</div>
						</DialogDescription>
					</DialogHeader>
				</div>
			</div>
		);
	},
);
