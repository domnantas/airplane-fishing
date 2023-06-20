import { useEffect, FormEventHandler } from "react";
import { AuthLayout } from "@/Layouts/AuthLayout";
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
import { Label } from "@/Components/ui/Label";
import { Checkbox } from "@/Components/ui/Checkbox";

export default function LogIn({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("log-in"));
	};

	return (
		<AuthLayout>
			<Head title="Log in" />

			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Log in</CardTitle>
					<CardDescription>
						Don't have an account yet?{" "}
						<Link
							href={route("sign-up")}
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign up!
						</Link>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="login" onSubmit={submit}>
						<div className="grid w-full items-center gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									autoFocus
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
							<div className="flex items-center gap-2">
								<Checkbox
									id="remember"
									checked={data.remember}
									onCheckedChange={(checked) =>
										setData("remember", !!checked)
									}
								/>
								<Label htmlFor="remember">Remember me</Label>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					{canResetPassword && (
						<Button
							variant="link"
							className="text-muted-foreground"
							asChild
						>
							<Link href={route("password.request")}>
								Forgot your password?
							</Link>
						</Button>
					)}
					<Button type="submit" form="login" disabled={processing}>
						Log in
					</Button>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
