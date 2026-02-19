import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AccountSection = () => {
	return (
		<div id="account" className="flex scroll-mt-24 flex-col gap-3">
			<h1 className="text-2xl font-semibold">Account</h1>
			<div className="flex flex-col gap-4">
				<div className="flex w-full flex-col gap-2">
					<Label>Username</Label>
					<Input type="text" placeholder="Username" />
				</div>

				<div className="flex w-full flex-col gap-2">
					<Label>Email</Label>
					<Input type="email" placeholder="Email" />
				</div>

				<div className="flex justify-end gap-2">
					<Button
						variant="default"
						className="w-1/12 hover:cursor-pointer"
					>
						Edit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AccountSection;
