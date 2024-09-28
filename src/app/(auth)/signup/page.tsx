"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AppBar from "~/src/components/appBar";
import { useAuth } from "~/src/contexts/authProvider";
import { SignUpForm } from "~/src/modules/signup/components/form";

export default function SignUpPage() {
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
            <h1 className="text-white text-2xl mb-5">Sign Up</h1>
            <SignUpForm />
          </div>
        </div>
      </main>
    </>
  );
}
