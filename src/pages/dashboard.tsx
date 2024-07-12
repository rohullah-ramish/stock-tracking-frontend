import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/user";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const { deleteSession } = useUser();

  function handleSignOut() {
    deleteSession();
    router.push("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}

Home.auth = true;
