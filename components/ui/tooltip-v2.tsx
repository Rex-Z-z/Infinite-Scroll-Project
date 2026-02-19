import { cn } from "@/lib/utils";
import React from "react";

const Tooltip2 = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-700 text-white text-xs rounded-md px-2.5 py-1.5`,
				className,
			)}
		>
			{children}
			<div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
		</div>
	);
};

export default Tooltip2;
