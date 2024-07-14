import Link from "next/link";
import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { UserProvider, useUser } from "@/stores/user";
import { LoaderCircle } from "lucide-react";

type AuthWrapperProps = {
  isProtected: boolean;
};

export default function AuthWrapper(
  props: PropsWithChildren<AuthWrapperProps>
) {
  return (
    <UserProvider>
      <AuthGuard {...props} />
    </UserProvider>
  );
}

function AuthGuard(props: PropsWithChildren<AuthWrapperProps>) {
  const { isProtected } = props;

  const { user, isLoading } = useUser();

  if (isLoading) return <AuthLoader />;

  if (!user) if (isProtected) return <ForbiddenPage />;

  return props.children;
}

function AuthLoader() {
  return (
    <div className="fixed top-0 left-0 z-[5] w-screen h-screen flex items-center justify-center bg-[#FAFAFA]">
      <LoaderCircle className="animate-spin text-[30px]" />
    </div>
  );
}

function ForbiddenPage() {
  return (
    <div className="fixed top-0 left-0 z-[5] w-screen min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You don&apos;t have access to this resource.
            </h3>
            <p className="text-sm text-muted-foreground">
              Please sign in to access this page.
            </p>
            <Link className="mt-4" href="/">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
