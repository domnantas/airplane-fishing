import { AuthLayout } from "@/Layouts/AuthLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/Button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@radix-ui/react-label";

export default function ForgotPassword({ status }: { status?: string }) {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.email"));
	};

	return (
		<AuthLayout>
			<Head title="Forgot Password" />

			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Forgot your password?</CardTitle>
					<CardDescription>
						No problem. Just let us know your email address and we
						will email you a password reset link that will allow you
						to choose a new one.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="forgot-password" onSubmit={submit}>
						<div className="grid w-full items-center gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									value={data.email}
									type="email"
									autoFocus
									onChange={(event) =>
										setData("email", event.target.value)
									}
								/>
								<InputError message={errors.email} />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					<Button
						type="submit"
						form="forgot-password"
						disabled={processing}
					>
						Send password reset link
					</Button>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
