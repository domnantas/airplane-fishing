import { cn } from "@/utils";
import { HTMLAttributes, forwardRef } from "react";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, ...props }, ref) => (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
H1.displayName = "H1";

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, ...props }, ref) => (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
H2.displayName = "H2";

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, ...props }, ref) => (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
H3.displayName = "H3";

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, ...props }, ref) => (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
H4.displayName = "H4";
