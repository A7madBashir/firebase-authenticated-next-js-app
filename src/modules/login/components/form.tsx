"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Indicator } from "~/src/components/indicator";
import { useAuth } from "~/src/contexts/authProvider";
import { isEmpty } from "~/src/utils/isEmpty";

export function LoginForm() {
  const [formData, setFormData] = useState({ password: "", email: "" });
  const { login, loading, errorMessage } = useAuth();

  // use password and email state then apply listener
  function handleLogIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Promise.resolve(
      login({ email: formData.email, password: formData.password })
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleLogIn} id="login" key={"log_in"} className="">
      <input
        type="email"
        placeholder="Email"
        required
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        minLength={8}
        placeholder="Password"
        required
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
        {!loading ? "Log In" : <Indicator />}
      </button>

      {isEmpty(errorMessage) ? (
        <></>
      ) : (
        <span style={{color: "indianred"}} className="text-lg my-4">{errorMessage}</span>
      )}
    </form>
  );
}
