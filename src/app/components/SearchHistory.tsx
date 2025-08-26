// "use client";
// import { useSession, signOut } from "next-auth/react";
// import { FaUserCircle } from "react-icons/fa";
// import { useState } from "react";
// import Link from "next/link";

// interface SearchItem {
//   productName: string;
//   price: string;
//   url: string;
// }

// export default function SearchHistory({ history }: { history: SearchItem[] }) {
//   const { data: session, status } = useSession();
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   return (
//     <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
//       {/* Scrollable Search History */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         <h2 className="text-lg font-bold mb-4">Search History</h2>
//         {history.length === 0 && <p className="text-gray-500">No searches</p>}
//         {history.map((item, idx) => (
//           <li key={idx} className="p-2 bg-gray shadow-md rounded list-none">
//             <div className="text-black">{item.productName}</div>
//             <div className="text-sm text-black">{item.price}</div>

//             <Link
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 text-xs underline break-all"
//             >
//               {/* {item.url} */}
//               {new URL(item.url).hostname}
//             </Link>
//           </li>
//         ))}
//       </div>

//       {/* Fixed User Icon Section at Bottom */}
//       <div className="relative border-t bg-gradient-to-r from-blue-100 to-white0">
//         <button
//           onClick={() => setShowUserMenu((prev) => !prev)}
//           className="w-full flex justify-center p-4 hover:bg-gray-200 transition"
//         >
//           <FaUserCircle className="text-3xl text-gray-700" />
//         </button>

//         {showUserMenu && (
//           <div className="absolute bottom-full left-0 w-full bg-white shadow-lg  rounded-t-lg p-4">
//             <p className="text-gray-800 font-medium mb-3 text-center border-b border-gray-400 ">
//               {session?.user?.name || "Guest"}
//             </p>
//             {status === "authenticated" && (
//               <button
//                 onClick={() => signOut({ callbackUrl: "/scraper" })}
//                 // className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded px-4 py-2 hover:brightness-110 transition"
//                 className=" h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition ml-25 shadow-lg hover:cursor-pointer"
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

// "use client";
// import { useSession, signOut } from "next-auth/react";
// import { FaUserCircle } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { VscSearchFuzzy, VscSearchStop } from "react-icons/vsc";
// interface SearchItem {
//   _id: string;
//   productName: string;
//   price: string;
//   url: string;
//   tracking: boolean; // New
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

//   return (
//     <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         <h2 className="text-lg font-bold mb-4">Search History</h2>
//         {items.length === 0 && <p className="text-gray-500">No searches</p>}
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className="p-2 bg-gray shadow-md rounded list-none"
//           >
//             <div className="text-black">{item.productName}</div>
//             <div className="text-sm text-black">{item.price}</div>
//             <Link
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 text-xs underline break-all"
//             >
//               {new URL(item.url).hostname}
//             </Link>
//             {/* <button
//               onClick={() => toggleTracking(item._id, item.tracking)}
//               className={`mt-2 px-3 py-1 rounded text-white ${
//                 item.tracking ? "bg-green-500" : "bg-gray-400"
//               }`}
//             >
//               {item.tracking ? "Tracking On" : "Tracking Off"}
//             </button> */}
//             <button
//               onClick={() => toggleTracking(item._id, item.tracking)}
//               title={
//                 item.tracking
//                   ? "Click to stop tracking"
//                   : "Click to start tracking"
//               }
//               className={`mt-2 px-3 py-1 rounded text-white flex items-center justify-center cursor-pointer ${
//                 item.tracking
//                   ? "bg-gradient-to-r from-blue-500 to-green-500"
//                   : "bg-gray-400"
//               }`}
//             >
//               {item.tracking ? (
//                 <VscSearchFuzzy className="text-lg" />
//               ) : (
//                 <VscSearchStop className="text-lg" />
//               )}
//             </button>
//           </li>
//         ))}
//       </div>

//       {/* User Menu */}
//       <div className="relative border-t bg-gradient-to-r from-blue-100 to-white0">
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
//                 className="h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition ml-25 shadow-lg hover:cursor-pointer"
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

// "use client";
// import { useSession, signOut } from "next-auth/react";
// import { FaUserCircle } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { VscSearchFuzzy, VscSearchStop } from "react-icons/vsc";
// import { FaTrashAlt } from "react-icons/fa";

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
//       }
//     } catch (err) {
//       console.error("Failed to delete history:", err);
//     }
//   };

//   return (
//     <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         <h2 className="text-lg font-bold mb-4">Search History</h2>
//         {items.length === 0 && <p className="text-gray-500">No searches</p>}
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className="p-2 bg-gray-100 shadow-md rounded list-none flex flex-col gap-2"
//           >
//             <div className="text-black font-medium">{item.productName}</div>
//             <div className="text-sm text-black">{item.price}</div>
//             <Link
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 text-xs underline break-all"
//             >
//               {new URL(item.url).hostname}
//             </Link>

//             <div className="flex gap-2">
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

//               <button
//                 onClick={() => deleteHistory(item._id)}
//                 title="Delete history"
//                 className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer"
//               >
//                 <FaTrashAlt className="text-sm" />
//               </button>
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
//                 className="h-10 px-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:opacity-90 transition shadow-lg hover:cursor-pointer"
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

interface SearchItem {
  _id: string;
  productName: string;
  price: string;
  url: string;
  tracking: boolean;
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
      }
    } catch (err) {
      console.error("Failed to delete history:", err);
    }
  };

  return (
    <aside className="w-80 bg-gradient-to-r from-blue-50 to-white border-r border-gray-200 flex flex-col max-h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-lg font-bold mb-4">Search History</h2>
        {items.length === 0 && <p className="text-gray-500">No searches</p>}
        {items.map((item) => (
          <li
            key={item._id}
            className="p-2 bg-gray-100 shadow-md rounded list-none relative pr-8"
          >
            {/* Delete Icon Top-Right */}
            <button
              onClick={() => deleteHistory(item._id)}
              title="Remove history"
              className=" cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <IoRemove className=" text-xl" />
            </button>

            <div className="text-black font-medium ">{item.productName}</div>
            <div className="text-sm text-black">{item.price}</div>
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xs underline break-all"
            >
              {new URL(item.url).hostname}
            </Link>

            <div className="flex gap-2 mt-2">
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
