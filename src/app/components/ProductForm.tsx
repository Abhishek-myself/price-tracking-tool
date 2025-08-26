"use client";

import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

interface ScraperProps {
  onScrapeSuccess: (name: string, price: string, url: string) => Promise<void>;
}

export default function Scraper({ onScrapeSuccess }: ScraperProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setName("");
    setPrice("");

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to scrape");

      if (data?.name && data?.price) {
        setName(data.name);
        setPrice(data.price);

        // ✅ Pass url as well
        await onScrapeSuccess(data.name, data.price, url);
      } else {
        setError("No product details found");
      }
    } catch (err: any) {
      setError(err?.message || "Error while scraping");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Enter Amazon/Flipkart product link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          required
        />

        {loading ? (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center animate-spin">
            <ImSpinner9 className="text-white text-xl" />
          </div>
        ) : (
          <button
            type="submit"
            className="px-6 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition"
          >
            Fetch Price
          </button>
        )}
      </form>

      {name && <p className="mt-4 text-lg font-medium">Name: {name}</p>}
      {price && <p className="mt-1 text-lg italic">Price: {price}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
