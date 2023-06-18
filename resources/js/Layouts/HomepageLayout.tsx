import { Header } from "@/Components/Header";
import { Button } from "@/Components/ui/Button";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export const HomepageLayout = ({
	children,
	isAuthenticated,
}: PropsWithChildren<{
	isAuthenticated: boolean;
}>) => (
	<>
		<Header>
			<nav className="w-full flex justify-end space-x-4">
				{isAuthenticated ? (
					<Button asChild>
						<Link href={route("dashboard")}>Dashboard</Link>
					</Button>
				) : (
					<>
						<Button variant="secondary" asChild>
							<Link href={route("log-in")}>Log in</Link>
						</Button>
						<Button asChild>
							<Link href={route("sign-up")}>Sign up</Link>
						</Button>
					</>
				)}
			</nav>
		</Header>
		<main>{children}</main>
	</>
);
