import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrimaryLayout } from "@/Layouts/PrimaryLayout";
import { H1, H2, H3 } from "@/Components/ui/Typography";

export default function Welcome({ auth }: PageProps) {
	return (
		<>
			<Head title="Airplane Fishing" />
			<PrimaryLayout isAuthenticated={!!auth.user}>
				<section className="container mx-auto py-40 text-center text-slate-700 dark:text-slate-300">
					<H1 className="text-5xl lg:text-7xl">
						✈ Airplane{" "}
						<span className="text-black dark:text-white">
							fishing
						</span>{" "}
						🎣
					</H1>
					<H3 className="mt-8">
						Track aircraft flying over your head
					</H3>
				</section>
			</PrimaryLayout>
		</>
	);
}
