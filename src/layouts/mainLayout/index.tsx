import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

function MainLayout(props: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 md:gap-8">
        {props.children}
      </main>
    </div>
  );
}

export default MainLayout;
