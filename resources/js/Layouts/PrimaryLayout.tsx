import { Header } from "@/Components/Header";
import { PropsWithChildren } from "react";

export const PrimaryLayout = ({
	children,
	isAuthenticated,
}: PropsWithChildren<{
	isAuthenticated: boolean;
}>) => (
	<>
		<Header isAuthenticated={isAuthenticated} />
		<main>{children}</main>
	</>
);
