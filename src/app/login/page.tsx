"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/scraper", // Redirect here after success
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.push(res?.url || "/scraper");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/scraper" })}
          className="mt-4 flex items-center justify-center gap-2  text-black w-full py-2 rounded hover:bg-gray-200 border-transparent w-full p-2 mb-4 rounded shadow"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </main>
  );
}
