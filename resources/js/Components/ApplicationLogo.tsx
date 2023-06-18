import { Icons } from "@/Components/ui/Icons";
import { cn } from "@/utils";
import { HTMLAttributes } from "react";

export default function ApplicationLogo({
	className,
	iconClassName,
}: HTMLAttributes<HTMLDivElement> & { iconClassName: string }) {
	return (
		<div className={cn("flex", className)}>
			<Icons.Plane className={cn("w-10 h-10", iconClassName)} />
			<Icons.Fish className={cn("w-10 h-10", iconClassName)} />
		</div>
	);
}
