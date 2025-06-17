"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, ChevronDown, ChevronUp, Link2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ThirdPartyConfigDropdown({ activeTab }: { activeTab: string }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!["thirdparty"].includes(activeTab)) {
      setIsOpen(false);
    }
    if (
      pathName.includes("payment") ||
      pathName.includes("sms") ||
      pathName.includes("pusher") ||
      pathName.includes("mail") ||
      pathName.includes("firebase") ||
      pathName.includes("recaptcha")
    ) {
      setIsOpen(true);
    }
  }, [activeTab, pathName]);

  const items = [
    {
      label: "Payment Gateway",
      href: "/payment-gateway",
      keyword: "payment",
    },
    { label: "SMS Gateway", href: "/sms-gateway", keyword: "sms" },
    { label: "Pusher Setup", href: "/pusher-setup", keyword: "pusher" },
    { label: "Mail Config", href: "/mail-config", keyword: "mail" },
    {
      label: "Firebase Notification",
      href: "/firebase-notification",
      keyword: "firebase",
    },
    {
      label: "Google ReCaptcha",
      href: "/google-recaptcha",
      keyword: "recaptcha",
    },
  ];

  return (
    <div className="w-full max-w-md !mb-10">
      <label className="px-3 text-[#8a94a6] mb-2 inline-block uppercase text-[11px] tracking-wider">
        3rd part configration
      </label>
      <button
        onClick={toggleDropdown}
        className={`mb-3 flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
          isOpen
            ? "bg-blue-50 text-blue-600 border-l border-blue-600"
            : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link2 className={`h-5 w-5 ${isOpen ? "text-blue-600" : ""}`} />
          <span>3rd Party Config</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="relative ml-6 mt-1">
            {/* Vertical connecting line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-gray-300" />

            {items.map((item, index) => {
              const isActive =
                pathName.includes(item.keyword) || activeTab === "thirdparty";
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`relative mt-2`}
                >
                  <div
                    className={`absolute left-0 top-1/2 w-4 h-0.5 ${
                      isActive ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  <Link
                    href={item.href}
                    className={`ml-4 flex w-[calc(100%-16px)] items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
