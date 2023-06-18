import { useEffect, FormEventHandler } from "react";
import { AuthLayout } from "@/Layouts/AuthLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@radix-ui/react-label";

export default function ResetPassword({
	token,
	email,
}: {
	token: string;
	email: string;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token: token,
		email: email,
		password: "",
		password_confirmation: "",
	});

	useEffect(() => {
		return () => {
			reset("password", "password_confirmation");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.store"));
	};

	return (
		<AuthLayout>
			<Head title="Reset Password" />

			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
				</CardHeader>
				<CardContent>
					<form id="reset-password" onSubmit={submit}>
						<div className="grid w-full items-center gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									value={data.email}
									type="email"
									onChange={(event) =>
										setData("email", event.target.value)
									}
								/>
								<InputError message={errors.email} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									value={data.password}
									type="password"
									onChange={(event) =>
										setData("password", event.target.value)
									}
								/>
								<InputError message={errors.password} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password_confirmation">
									Confirm Password
								</Label>
								<Input
									id="password_confirmation"
									value={data.password_confirmation}
									type="password"
									onChange={(event) =>
										setData(
											"password_confirmation",
											event.target.value
										)
									}
								/>
								<InputError
									message={errors.password_confirmation}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					<Button
						type="submit"
						form="reset-password"
						disabled={processing}
					>
						Reset Password
					</Button>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
