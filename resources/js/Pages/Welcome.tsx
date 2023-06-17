import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrimaryLayout } from "@/Layouts/PrimaryLayout";

export default function Welcome({
	auth,
	laravelVersion,
	phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
	return (
		<>
			<Head title="Airplane Fishing" />
			<PrimaryLayout isAuthenticated={!!auth.user}></PrimaryLayout>
		</>
	);
}
