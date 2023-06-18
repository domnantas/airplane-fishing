import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";

type HeaderProps = {
	isAuthenticated: boolean;
};
export const Header = ({ isAuthenticated }: HeaderProps) => (
	<header className="sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
		<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
			<Link href="/" className="text-2xl font-bold">
				Airplane Fishing
			</Link>
			<div className="flex flex-1 items-center justify-end space-x-4">
				<nav className="flex items-center space-x-4">
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
			</div>
		</div>
	</header>
);
