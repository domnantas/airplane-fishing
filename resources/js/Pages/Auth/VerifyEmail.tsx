import { EmptyLayout } from "@/Layouts/EmptyLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/Button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/Components/ui/Card";

export default function VerifyEmail({ status }: { status?: string }) {
	const { post, processing } = useForm({});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("verification.send"));
	};

	return (
		<EmptyLayout>
			<Head title="Email Verification" />

			<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Email Verification</CardTitle>
					</CardHeader>
					<CardContent>
						Thanks for signing up! Before getting started, could you
						verify your email address by clicking on the link we
						just emailed to you? If you didn't receive the email, we
						will gladly send you another.
					</CardContent>
					<CardFooter className="flex justify-end gap-2">
						<Button
							variant="link"
							className="text-muted-foreground"
							asChild
						>
							<Link href={route("logout")}>Log out</Link>
						</Button>
						<Button onClick={submit} disabled={processing}>
							Resend Verification Email
						</Button>
					</CardFooter>
				</Card>
			</div>
		</EmptyLayout>
	);
}
