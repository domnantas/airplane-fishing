import { useEffect, FormEventHandler } from "react";
import { EmptyLayout } from "@/Layouts/EmptyLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
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

export default function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm({
		password: "",
	});

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.confirm"));
	};

	return (
		<EmptyLayout>
			<Head title="Confirm Password" />

			<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Confirm Password</CardTitle>
						<CardDescription>
							This is a secure area of the application. Please
							confirm your password before continuing.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form id="confirm-password" onSubmit={submit}>
							<div className="grid w-full items-center gap-4">
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										value={data.password}
										type="password"
										autoFocus
										onChange={(event) =>
											setData(
												"password",
												event.target.value
											)
										}
									/>
									<InputError message={errors.password} />
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex justify-end gap-2">
						<Button
							type="submit"
							form="confirm-password"
							disabled={processing}
						>
							Confirm
						</Button>
					</CardFooter>
				</Card>
			</div>
		</EmptyLayout>
	);
}
