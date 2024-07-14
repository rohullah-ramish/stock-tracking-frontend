import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

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

import { LoaderCircle } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();

  async function handleSubmit() {
    if (isLoading) return;

    setLoading(true);

    const result = await AuthManager.signIn(email, password);

    if (!result.success) setError(result.message);
    else router.push("/overview");

    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                required
              />
            </div>
            {error && (
              <div className="grid gap-2">
                <Label className="text-red-500">{error}</Label>
              </div>
            )}
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
