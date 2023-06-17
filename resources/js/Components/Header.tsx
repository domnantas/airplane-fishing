import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";

export const Header = () => (
	<header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
		<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
			<Link href="/" className="text-2xl font-bold">
				Airplane Fishing
			</Link>
			<div className="flex flex-1 items-center justify-end space-x-4">
				<nav className="flex items-center space-x-4">
					<Button asChild>
						<Link href={route("login")}>Sign in</Link>
					</Button>
					<Button variant="secondary" asChild>
						<Link href={route("register")}>Sign up</Link>
					</Button>
				</nav>
			</div>
		</div>
	</header>
);
