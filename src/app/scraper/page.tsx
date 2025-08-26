"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import ProductForm from "@/app/components/ProductForm";
import { FaUserCircle } from "react-icons/fa";
// import SearchHistory from "../components/SearchHistory";
import RightSidebar from "../components/RightSidebar";
import SearchHistory from "../components/SearchHistory";

interface SearchItem {
  _id: string;
  productName: string;
  price: string;
  url: string;
  tracking: boolean;
}

export default function ScraperPage() {
  const { data: session, status } = useSession();
  const [typedUrl, setTypedUrl] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [history, setHistory] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/search-history");
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [session]);

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTypedUrl(value);
    setShowLoginPrompt(!session && value.trim() !== "");
  };

  // const handleScrapeSuccess = async (
  //   name: string,
  //   price: string,
  //   url: string
  // ) => {
  //   const newItem = { productName: name, price, url };
  //   setHistory((prev) => [newItem, ...prev].slice(0, 5));
  const handleScrapeSuccess = async (
    name: string,
    price: string,
    url: string
  ) => {
    const newItem = {
      _id: crypto.randomUUID(), // temporary ID until fetched from DB
      productName: name,
      price,
      url,
      tracking: true,
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 5));

    await fetch("/api/save-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    const res = await fetch("/api/search-history");
    if (res.ok) {
      const data = await res.json();
      setHistory(data);
    }
  };

  // if (!session) {
  //   return (
  //     // <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-white to-blue-100 ml-30">
  //     <main className="min-h-screen flex items-center justify-center px-4 bg-black relative ">
  //       {/* <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.6),_transparent_40%)]"></div> */}
  //       {/* <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
  //         <h1 className="text-2xl text-blue-900 font-bold mb-6">
  //           Product Price Scraper
  //         </h1> */}
  //       <div className="w-full max-w-xl bg-transparent rounded-lg shadow-lg p-8">
  //         {/* <h1 className="text-2xl font-bold text-blue-900 text-center mb-6"> */}
  //         <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
  //           Product Price Scraper
  //         </h1>

  //         <input
  //           type="url"
  //           placeholder="Enter product URL to scrape"
  //           value={typedUrl}
  //           onChange={handleInputChange}
  //           // className="border w-full p-3 rounded mb-4 border-blue-900"
  //           className="h-12 w-full px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
  //         />

  //         {showLoginPrompt && (
  //           <div className="border border-transparent p-4 rounded mt-5">
  //             <p className="mb-3 text-gray-500   ml-30">
  //               {/* You need to be logged in to scrape product prices */}
  //               Login to scrape product prices
  //             </p>
  //             <div className="flex justify-center gap-4">
  //               <a
  //                 href="/login"
  //                 className="shadow-inner bg-gradient-to-r  from-blue-500 to-green-400 text-white font-bold rounded px-4 py-2 hover:brightness-110 transition"
  //               >
  //                 Login
  //               </a>
  //               <a
  //                 href="/signup"
  //                 className="shadow-inner bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded px-4 py-2 hover:brightness-110 transition"
  //               >
  //                 Create Account
  //               </a>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </main>
  //   );
  // }
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-black relative">
        {/*  Blue gradient in top-left corner */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.6),_transparent_40%)]"></div>

        <div className="w-full max-w-xl bg-transparent rounded-lg shadow-lg p-8 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
            Product Price Scraper
          </h1>

          <input
            type="url"
            placeholder="Enter product URL to scrape"
            value={typedUrl}
            onChange={handleInputChange}
            className="h-12 w-full px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
          />

          {showLoginPrompt && (
            <div className="border border-transparent p-4 rounded mt-5">
              <p className="mb-3 text-gray-500 ml-30">
                Login to scrape product prices
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/login"
                  className="shadow-inner bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded px-4 py-2 hover:brightness-110 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="shadow-inner bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded px-4 py-2 hover:brightness-110 transition"
                >
                  Create Account
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex bg-gradient-to-r from-white to-blue-50">
      {/* Sidebar with fixed height + scroll */}
      {/* <aside className="w-69 bg-gray-150 p-2  overflow-y-auto max-h-screen">
        <SearchHistory history={history} />
      </aside> */}
      <SearchHistory history={history} />

      <div className="flex flex-col flex-1 items-center justify-center">
        {/* Logout and user info */}
        {/* <div className="absolute top-4 right-4 flex flex-col items-center space-y-1">
          <FaUserCircle className="text-gray-600 w-8 h-8" />
          <p className="text-sm font-medium text-gray-700">
            {session.user?.name}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/scraper" })}
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded px-4 py-2 hover:brightness-110 transition"
          >
            Logout
          </button>
        </div> */}

        {/* Centered input container like ChatGPT */}
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
          {/* <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">
            Product Price Scraper
          </h1> */}
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
            Product Price Scraper
          </h1>
          <ProductForm onScrapeSuccess={handleScrapeSuccess} />
        </div>
      </div>
      {/* Right Sidebar */}
      <RightSidebar />
    </main>
  );
}
