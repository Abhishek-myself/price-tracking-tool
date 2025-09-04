// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//       } else {
//         setSuccess(data.message || "Account created successfully");

//         // Redirect to login after 1.5 seconds
//         setTimeout(() => {
//           router.push("/login");
//         }, 1500);
//       }
//     } catch (err) {
//       setError("Failed to connect to server");
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         // className="bg-white p-6 rounded shadow w-80"
//         className="bg-white p-6 rounded shadow w-96 space-y-4"
//       >
//         <h2 className="text-lg font-bold mb-4">Sign Up</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         {success && <p className="text-green-500 mb-2">{success}</p>}

//         <input
//           //   className="border p-2 w-full mb-2"
//           className="border w-full p-2 rounded"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           //   className="border p-2 w-full mb-2"
//           className="border w-full p-2 rounded"
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           //   className="border p-2 w-full mb-4"
//           className="border w-full p-2 rounded"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white w-full py-2 rounded">
//           Sign Up
//         </button>

//         {/* Back to login link */}
//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </main>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess(data.message || "Account created successfully");

        // Redirect to login after 1.5 seconds
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Left Image Section */}
      {/* <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center"> */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-green-400 items-center justify-center">
        <Image
          src="/track.png" // Place transparent image in /public
          alt="Signup Illustration"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Right Signup Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-6">
        <form onSubmit={handleSubmit} className=" p-6 rounded  w-96 space-y-4">
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

          <h2 className="text-lg font-bold mb-4 text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <input
            className="border-2 border-gray-300  w-full p-2 rounded"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-2 border-gray-300 w-full p-2 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-300 w-full p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            // className="bg-blue-500 text-white w-full py-2 rounded"
            // className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-2 rounded hover:bg-blue-600"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-2 rounded cursor-pointer shadow-md hover:shadow-xl transform transition-transform duration-150 active:scale-95"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
