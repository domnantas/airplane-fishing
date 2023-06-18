import { useEffect, FormEventHandler } from "react";
import { EmptyLayout } from "@/Layouts/EmptyLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/Button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	CardDescription,
} from "@/Components/ui/Card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@radix-ui/react-label";

export default function SignUp() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
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

		post(route("sign-up"));
	};

	return (
		<EmptyLayout>
			<Head title="Sign Up" />

			<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Sign Up</CardTitle>
						<CardDescription>
							Have an account already?{" "}
							<Link
								href={route("log-in")}
								className="underline underline-offset-4 hover:text-primary"
							>
								Log in!
							</Link>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form id="sign-up" onSubmit={submit}>
							<div className="grid w-full items-center gap-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										autoFocus
										value={data.name}
										type="text"
										onChange={(event) =>
											setData("name", event.target.value)
										}
										required
									/>
									<InputError message={errors.name} />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										value={data.email}
										type="email"
										onChange={(event) =>
											setData("email", event.target.value)
										}
										required
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
											setData(
												"password",
												event.target.value
											)
										}
										required
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
										required
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
							form="sign-up"
							disabled={processing}
						>
							Sign Up
						</Button>
					</CardFooter>
				</Card>
			</div>
		</EmptyLayout>
	);
}
