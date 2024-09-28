"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import AppBar from "~/src/components/appBar";
import { useAuth } from "~/src/contexts/authProvider";
import { LoginForm } from "~/src/modules/login/components/form";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return redirect("/");
  }, [isAuthenticated]);

  return (
    <>
      <AppBar />
      <main className="min-h-screen flex items-center justify-center">
        <div>
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg shadow-slate-700 w-96">
            <h1 className="text-white text-2xl mb-5">Log In</h1>
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}
