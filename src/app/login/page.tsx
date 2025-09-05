// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await signIn("credentials", {
//       redirect: false,
//       email: form.email,
//       password: form.password,
//       callbackUrl: "/scraper", // Redirect here after success
//     });

//     if (res?.error) {
//       setError(res.error);
//       return;
//     }

//     router.push(res?.url || "/scraper");
//   };

//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-96 space-y-4"
//       >
//         <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border w-full p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="border w-full p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>

//         {/* Google Login Button */}
//         <button
//           type="button"
//           onClick={() => signIn("google", { callbackUrl: "/scraper" })}
//           className="mt-4 flex items-center justify-center gap-2  text-black w-full py-2 rounded hover:bg-gray-200 border-transparent w-full p-2 mb-4 rounded shadow"
//         >
//           <FcGoogle size={20} />
//           Sign in with Google
//         </button>

//         <p className="text-center text-sm mt-4">
//           New user?{" "}
//           <a href="/signup" className="text-blue-500 hover:underline">
//             Create an account
//           </a>
//         </p>
//       </form>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";

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
      callbackUrl: "/scraper",
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.push(res?.url || "/scraper");
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-green-400 items-center justify-center">
        <Image
          src="/track.png"
          alt="Login Illustration"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="bg p-6 rounded  w-96 space-y-4"
        >
          {/* Clickable Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/scraper">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border-2 border-gray-300 w-full p-2 rounded"
            required
          />

          {/* <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-2 rounded cursor-pointer  hover:shadow-lg transition-shadow duration-300"
          >
            Login
          </button> */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-2 rounded cursor-pointer shadow-md hover:shadow-xl transform transition-transform duration-150 active:scale-95"
          >
            Login
          </button>

          {/* Divider with OR */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/scraper" })}
            className="mt-4 flex items-center justify-center gap-2 text-black w-full py-2 rounded hover:bg-gray-200  shadow"
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
      </div>
    </main>
  );
}
