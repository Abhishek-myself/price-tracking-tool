// "use client";
// import { useSession, signOut } from "next-auth/react";
// import { FaUserCircle } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { VscSearchFuzzy, VscSearchStop } from "react-icons/vsc";
// import { IoRemove } from "react-icons/io5";
// import Image from "next/image";
// import toast from "react-hot-toast";

// interface SearchItem {
//   _id: string;
//   productName: string;
//   price: string;
//   url: string;
//   tracking: boolean;

// }

// export default function SearchHistory({ history }: { history: SearchItem[] }) {
//   const { data: session, status } = useSession();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [items, setItems] = useState(history);

//   useEffect(() => {
//     setItems(history);
//   }, [history]);

//   const toggleTracking = async (id: string, current: boolean) => {
//     try {
//       const res = await fetch("/api/toggle-tracking", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, tracking: !current }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setItems((prev) =>
//           prev.map((item) =>
//             item._id === id ? { ...item, tracking: !current } : item
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Failed to toggle tracking:", err);
//     }
//   };

//   const deleteHistory = async (id: string) => {
//     try {
//       const res = await fetch("/api/delete-history", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setItems((prev) => prev.filter((item) => item._id !== id));
//         toast.success("Search history deleted successfully!");
//       } else {
//         toast.error(data.error || "Failed to delete history.");
//       }
//     } catch (err) {
//       console.error("Failed to delete history:", err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {/* Logo at Top */}
//         {/* <div className="flex items-center justify-start mb-10">
//           <Image
//             src="/logo2.png"
//             alt="Logo"
//             width={100}
//             height={80}
//             className="object-contain  rounded"
//           />
//         </div> */}
//         <div className="flex  mb-6">
//           <Image
//             src="/logo2.png"
//             alt="Logo"
//             width={80}
//             height={80}
//             className="rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
//           />
//         </div>
//         <h2 className="text-lg font-bold mb-4">Search History</h2>
//         {items.length === 0 && <p className="text-gray-500">No searches</p>}
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className="p-2 bg-gray-100 shadow-md rounded list-none relative pr-8"
//           >
//             {/* Delete Icon Top-Right */}
//             <button
//               onClick={() => deleteHistory(item._id)}
//               title="Remove history"
//               className=" cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700"
//             >
//               <IoRemove className=" text-xl" />
//             </button>

//             <div className="text-black font-medium ">{item.productName}</div>
//             <div className="text-sm text-black">{item.price}</div>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => toggleTracking(item._id, item.tracking)}
//                 title={
//                   item.tracking
//                     ? "Click to stop tracking"
//                     : "Click to start tracking"
//                 }
//                 className={`px-3 py-1 rounded text-white flex items-center justify-center cursor-pointer ${
//                   item.tracking
//                     ? "bg-gradient-to-r from-blue-500 to-green-500"
//                     : "bg-gray-400"
//                 }`}
//               >
//                 {item.tracking ? (
//                   <VscSearchFuzzy className="text-lg" />
//                 ) : (
//                   <VscSearchStop className="text-lg" />
//                 )}
//               </button>
//               <Link
//                 href={item.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 // className=5"
//               >
//                 {/* {new URL(item.url).hostname} */}
//                 <Image
//                   src={
//                     item.url.includes("amazon")
//                       ? "/amazon-icon.png"
//                       : item.url.includes("flipkart")
//                       ? "/flipkart-icon.png"
//                       : "/default-icon.png"
//                   }
//                   alt="Store Logo"
//                   width={35}
//                   height={35}
//                   className="cursor-pointer hover:scale-110 transition-transform mt-2"
//                 />
//               </Link>
//             </div>
//           </li>
//         ))}
//       </div>

//       {/* User Menu */}
//       <div className="relative border-t bg-gradient-to-r from-blue-100 to-white">
//         <button
//           onClick={() => setShowUserMenu((prev) => !prev)}
//           className="w-full flex justify-center p-4 hover:bg-gray-200 transition"
//         >
//           <FaUserCircle className="text-3xl text-gray-700" />
//         </button>

//         {showUserMenu && (
//           <div className="absolute bottom-full left-0 w-full bg-white shadow-lg rounded-t-lg p-4">
//             <p className="text-gray-800 font-medium mb-3 text-center border-b border-gray-400">
//               {session?.user?.name || "Guest"}
//             </p>
//             {status === "authenticated" && (
//               <button
//                 onClick={() => signOut({ callbackUrl: "/scraper" })}
//                 className="ml-25 h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition shadow-lg hover:cursor-pointer"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

"use client";
import { useSession, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { VscSearchFuzzy, VscSearchStop } from "react-icons/vsc";
import { IoRemove } from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";

interface SearchItem {
  _id: string;
  productName: string;
  price: string;
  url: string;
  tracking: boolean;
  slackNotify?: boolean;
  emailNotify?: boolean;
  telegramNotify?: boolean;
}

export default function SearchHistory({ history }: { history: SearchItem[] }) {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [items, setItems] = useState(history);

  useEffect(() => {
    setItems(history);
  }, [history]);

  const toggleTracking = async (id: string, current: boolean) => {
    try {
      const res = await fetch("/api/toggle-tracking", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, tracking: !current }),
      });

      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, tracking: !current } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle tracking:", err);
    }
  };

  const toggleNotification = async (
    id: string,
    type: "slackNotify" | "emailNotify" | "telegramNotify",
    current: boolean
  ) => {
    try {
      // let body: any = { id, type, value: !current };

      // // If enabling Telegram, include chat ID from .env (or later from user input)
      // if (type === "telegramNotify" && !current) {
      //   body.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      // }
      const res = await fetch("/api/toggle-notification", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, value: !current }),
        // body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, [type]: !current } : item
          )
        );
        // toast.success(
        //   `${type === "slackNotify" ? "Slack" : "Email"} notification ${
        //     !current ? "enabled" : "disabled"
        //   }`
        toast.success(
          `${type.replace("Notify", "")} notification ${
            !current ? "enabled" : "disabled"
          }`
        );
      }
    } catch (err) {
      console.error("Failed to toggle notification:", err);
      toast.error("Failed to toggle notification.");
    }
  };

  const deleteHistory = async (id: string) => {
    try {
      const res = await fetch("/api/delete-history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item._id !== id));
        toast.success("Search history deleted successfully!");
      } else {
        toast.error(data.error || "Failed to delete history.");
      }
    } catch (err) {
      console.error("Failed to delete history:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex  mb-6">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
        <h2 className="text-lg font-bold mb-4">Search History</h2>
        {items.length === 0 && <p className="text-gray-500">No searches</p>}
        {items.map((item) => (
          <li
            key={item._id}
            className="p-2 bg-gray-100 shadow-md rounded list-none relative pr-8"
          >
            <button
              onClick={() => deleteHistory(item._id)}
              title="Remove history"
              className=" cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <IoRemove className=" text-xl" />
            </button>

            <div className="text-black font-medium ">{item.productName}</div>
            <div className="text-sm text-black">{item.price}</div>

            <div className="flex gap-2 mt-2">
              {/* Tracking Toggle */}
              <button
                onClick={() => toggleTracking(item._id, item.tracking)}
                title={
                  item.tracking
                    ? "Click to stop tracking"
                    : "Click to start tracking"
                }
                className={`px-3 py-1 rounded text-white flex items-center justify-center cursor-pointer ${
                  item.tracking
                    ? "bg-gradient-to-r from-blue-500 to-green-500"
                    : "bg-gray-400"
                }`}
              >
                {item.tracking ? (
                  <VscSearchFuzzy className="text-lg" />
                ) : (
                  <VscSearchStop className="text-lg" />
                )}
              </button>

              <button
                disabled={!item.tracking}
                onClick={() =>
                  toggleNotification(
                    item._id,
                    "slackNotify",
                    item.slackNotify ?? false
                  )
                }
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition
    ${!item.tracking && "opacity-50 cursor-not-allowed"}`}
                title={
                  item.slackNotify
                    ? "Slack Notifications On"
                    : "Slack Notifications Off"
                }
              >
                <Image
                  src="/slack.png"
                  alt="Slack"
                  width={130}
                  height={130}
                  className={`object-contain transition scale-170
      ${
        item.slackNotify
          ? "grayscale-0 brightness-100"
          : "grayscale brightness-75"
      }`}
                />
              </button>

              <button
                disabled={!item.tracking}
                onClick={() =>
                  toggleNotification(
                    item._id,
                    "emailNotify",
                    item.emailNotify ?? false
                  )
                }
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition
    ${!item.tracking && "opacity-50 cursor-not-allowed"}`}
                title={
                  item.emailNotify
                    ? "Email Notifications On"
                    : "Email Notifications Off"
                }
              >
                <Image
                  src="/gmail.png"
                  alt="Gmail"
                  width={200}
                  height={200}
                  className={`object-contain transition scale-170
      ${
        item.emailNotify
          ? "grayscale-0 brightness-100"
          : "grayscale brightness-75"
      }`}
                />
              </button>

              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={
                    item.url.includes("amazon")
                      ? "/amazon-icon.png"
                      : item.url.includes("flipkart")
                      ? "/flipkart-icon.png"
                      : "/default-icon.png"
                  }
                  alt="Store Logo"
                  width={35}
                  height={35}
                  className="cursor-pointer hover:scale-110 transition-transform mt-2 ml-30"
                />
              </Link>
            </div>
          </li>
        ))}
      </div>

      {/* User Menu */}
      <div className="relative border-t bg-gradient-to-r from-blue-100 to-white">
        <button
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="w-full flex justify-center p-4 hover:bg-gray-200 transition"
        >
          <FaUserCircle className="text-3xl text-gray-700" />
        </button>

        {showUserMenu && (
          <div className="absolute bottom-full left-0 w-full bg-white shadow-lg rounded-t-lg p-4">
            <p className="text-gray-800 font-medium mb-3 text-center border-b border-gray-400">
              {session?.user?.name || "Guest"}
            </p>
            {status === "authenticated" && (
              <button
                onClick={() => signOut({ callbackUrl: "/scraper" })}
                className="ml-25 h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition shadow-lg hover:cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
