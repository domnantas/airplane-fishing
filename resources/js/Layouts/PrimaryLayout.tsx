import { Header } from "@/Components/Header";
import { PropsWithChildren } from "react";

export const PrimaryLayout = ({ children }: PropsWithChildren) => (
	<>
		<Header />
		<main>{children}</main>
	</>
);
