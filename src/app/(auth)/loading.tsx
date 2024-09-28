import { Indicator } from "~/src/components/indicator";

export default function Loading() {
  return (
    <main className="text-foreground bg-background flex min-h-screen flex-col items-center justify-center m-auto main-width">
      <Indicator />
    </main>
  );
}
