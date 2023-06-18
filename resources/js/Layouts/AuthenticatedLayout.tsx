import { Header } from "@/Components/Header";
import { Button } from "@/Components/ui/Button";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export const AuthenticatedLayout = ({ children }: PropsWithChildren<{}>) => (
	<>
		<Header>
			<nav className="w-full flex justify-end space-x-4">
				<Button asChild>
					<Link href={route("logout")} method="post" as="button">
						Log out
					</Link>
				</Button>
			</nav>
		</Header>
		<main>{children}</main>
	</>
);
