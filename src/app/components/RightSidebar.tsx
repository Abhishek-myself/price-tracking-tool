"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlGraph } from "react-icons/sl";
interface Update {
  productName: string;
  oldPrice: string;
  newPrice: string;
  difference: number;
  change: "increase" | "decrease";
}

export default function RightSidebar() {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const res = await fetch("/api/price-updates");
        if (res.ok) {
          const data = await res.json();
          setUpdates(data);
        }
      } catch (err) {
        console.error("Failed to fetch price updates:", err);
      }
    }

    // 🔹 Run immediately
    fetchUpdates();

    // 🔹 Auto refresh every 1 min
    const interval = setInterval(fetchUpdates, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-80 bg-gradient-to-t from-white to-blue-50 border-transparent shadow-lg p-4 overflow-y-auto">
      <div className="flex   border-b  mb-10">
        {/* Amazon Icon */}
        <Link
          href="https://www.amazon.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/amazon-icon.png"
            alt="Amazon"
            width={60}
            height={60}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>

        {/* Flipkart Icon */}
        <Link
          href="https://www.flipkart.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/flipkart-icon.png"
            alt="Flipkart"
            width={60}
            height={60}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </Link>
      </div>

      <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
        <SlGraph className="text-blue-500 text-xl" />
        Price Updates
      </h2>

      {updates.length === 0 ? (
        <p className="text-gray-500">No price changes detected</p>
      ) : (
        updates.map((u, i) => (
          <div
            key={i}
            className={`mb-3 p-3 rounded ${
              u.change === "increase" ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <p className="font-semibold">{u.productName}</p>
            <p className="text-sm">
              Old: {u.oldPrice} → New: {u.newPrice}
            </p>
            <p className="text-sm font-medium">
              {u.change === "increase" ? "⬆️ Increased" : "⬇️ Decreased"} by{" "}
              {Math.abs(u.difference)}
            </p>
          </div>
        ))
      )}
    </aside>
  );
}
