import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

interface ChildLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  childLinks?: ChildLink[];
}

interface MultipleListLinkProps {
  childLink: ChildLink;
}

export default function MultipListLink({ childLink }: MultipleListLinkProps) {
  const pathName = usePathname();
  const activeTab = pathName.slice(pathName.indexOf("/") + 1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (childLink.childLinks) {
      const isActive = childLink.childLinks.some((el) =>
        activeTab.includes(el.href)
      );
      setIsExpanded(isActive);
    }
  }, [activeTab]);

  return (
    <>
      <button
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        className={`mt-2 mb-3 flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
          isExpanded
            ? "bg-blue-50 text-blue-600 border-l border-blue-600"
            : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-3">
          {childLink.icon}
          <span>{childLink.label}</span>
        </div>
        {isExpanded ? (
          <ChevronUp
            className={`h-5 w-5 ${isExpanded ? "text-blue-600" : ""}`}
          />
        ) : (
          <ChevronDown
            className={`h-5 w-5 ${isExpanded ? "text-blue-600" : ""}`}
          />
        )}
      </button>
      <div className="relative ml-6 mt-1">
        {childLink.childLinks?.map((el, index) => (
          <AnimatePresence key={index}>
            {isExpanded && (
              <>
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                    activeTab.includes(el.href)
                      ? "bg-gradient-to-t"
                      : "bg-gradient-to-b"
                  } bg-gradient-to-b from-blue-400 to-gray-300`}
                />
                {/* Category item */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative mt-1"
                >
                  <div
                    className={`absolute left-0 top-1/2 w-4 h-0.5 ${
                      activeTab?.includes(el.href)
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                  <Link
                    href={`/${el.href}`}
                    className={`ml-4 flex w-[calc(100%-16px)] items-center gap-3 pl-3  py-2 rounded-md hover:bg-gray-100 ${
                      activeTab?.includes(el.href)
                        ? "bg-blue-50 text-blue-600 border-l border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {el.label}
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        ))}
      </div>
    </>
  );
}
