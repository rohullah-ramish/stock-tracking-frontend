import Link from "next/link";
import Head from "next/head";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AuthManager from "@/firebase/auth";

import { useRouter } from "next/router";
import { LoaderCircle } from "lucide-react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();

  async function handleSubmit() {
    if (isLoading) return;

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = await AuthManager.signUp(email, password);

    if (!result.success) setError(result.message);
    else router.push("/overview");

    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type="password"
              />
            </div>
            {error && (
              <div className="grid gap-2">
                <Label className="text-red-500">{error}</Label>
              </div>
            )}
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <SignUp />
    </>
  );
}
