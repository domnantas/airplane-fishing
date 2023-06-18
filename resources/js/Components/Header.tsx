import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import ApplicationLogo from "./ApplicationLogo";

export const Header = ({ children }: PropsWithChildren) => (
	<header className="sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
		<div className="container flex h-16 items-center">
			<Link href={route("homepage")} className="text-2xl font-bold mr-2">
				<ApplicationLogo iconClassName="w-8 h-8" />
			</Link>
			{children}
		</div>
	</header>
);
