import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrimaryLayout } from "@/Layouts/PrimaryLayout";
import { H1, H3 } from "@/Components/ui/Typography";
import { Icons } from "@/Components/ui/Icons";

export default function Welcome({ auth }: PageProps) {
	return (
		<>
			<Head title="Airplane Fishing" />
			<PrimaryLayout isAuthenticated={!!auth.user}>
				<section className="container mx-auto py-40 text-center text-slate-700 dark:text-slate-300">
					<H1 className="text-5xl lg:text-7xl ">
						<Icons.Plane className="inline align-top w-12 h-12 lg:w-20 lg:h-20" />{" "}
						Airplane{" "}
						<span className="text-black dark:text-white">
							fishing{" "}
							<Icons.Fish className="inline align-top w-12 h-12 lg:w-20 lg:h-20" />
						</span>
					</H1>
					<H3 className="mt-8">
						Track aircraft flying over your head
					</H3>
				</section>
			</PrimaryLayout>
		</>
	);
}
