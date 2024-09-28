"use client";
import { useAuth } from "~/src/contexts/authProvider";
import { ChangeEvent, FormEvent, useState } from "react";
import { Indicator } from "~/src/components/indicator";
import { isEmpty } from "~/src/utils/isEmpty";

export function SignUpForm() {
  // use password and email state then apply listener
  const { signUp, loading, errorMessage } = useAuth();
  const [formData, setFormData] = useState({ password: "", email: "" });

  function handleSignUpSubmit(form: FormEvent<HTMLFormElement>) {
    form.preventDefault();

    Promise.resolve(
      signUp({
        email: formData.email,
        password: formData.password,
        confirmPassword: "",
      })
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form id="signUp" key="sign_up" className="" onSubmit={handleSignUpSubmit}>
      <input
        type="email"
        required
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        name="password"
        minLength={8}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
        {!loading ? "Sign Up" : <Indicator />}
      </button>

      {isEmpty(errorMessage) ? (
        <></>
      ) : (
        <span style={{color: "indianred"}} className="text-lg my-4">{errorMessage}</span>
      )}
    </form>
  );
}
