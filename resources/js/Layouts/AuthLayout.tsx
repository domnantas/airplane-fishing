import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => (
	<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
		<Link href={route("homepage")}>
			<ApplicationLogo className="p-8" iconClassName="w-20 h-20" />
		</Link>
		{children}
	</div>
);
