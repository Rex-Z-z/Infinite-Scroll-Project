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
				`absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-md bg-gray-700 px-2.5 py-1.5 text-xs text-white`,
				className,
			)}
		>
			{children}
			<div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-gray-700 border-r-transparent border-l-transparent"></div>
		</div>
	);
};

export default Tooltip2;
