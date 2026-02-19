"use client";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFound = () => {
	return (
		<html>
			<body className="flex h-[calc(90vh-2rem)] w-full flex-col items-center justify-center">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex flex-col items-center justify-center">
						<div className="relative flex items-center justify-center">
							<h1 className="text-muted/20 text-[350px] font-bold tracking-widest select-none">
								404
							</h1>
							<Image
								src="/404-error.svg"
								alt="Server Error Illustration"
								width={376}
								height={376}
								className="absolute bottom-4 object-contain"
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2.5">
							<h1 className="text-2xl font-semibold">
								You&apos;ve Scrolled Too Far
							</h1>
							<p className="w-max-sm text-muted-foreground text-center">
								You&apos;ve reached the end of the known
								universe. There are no more comics here.
							</p>
							<Button
								variant="default"
								className="hover:cursor-pointer"
							>
								<a href="/home">Back to Home</a>
							</Button>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default NotFound;
