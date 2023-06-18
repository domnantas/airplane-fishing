import * as React from "react";

import { cn } from "@/utils";

const InputError = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement> & { message?: string }
>(({ className, children, message, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn("text-sm font-medium text-destructive", className)}
			{...props}
		>
			{message}
		</p>
	);
});
InputError.displayName = "InputError";
