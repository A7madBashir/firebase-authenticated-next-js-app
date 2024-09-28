"use client";

import AppBar from "../components/appBar";
import { useAuth } from "../contexts/authProvider";
import { Posts } from "../modules/posts/components/posts";

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <AppBar />
      <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center ">
          <h1 className="text-3xl">Welcome</h1>
          {isAuthenticated ? <Posts /> : "Login for discover our posts"}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
