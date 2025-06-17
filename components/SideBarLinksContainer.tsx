"use client";

import Link from "next/link";
import React, { use, useEffect } from "react";
import { usePathname } from "next/navigation";
import MultipListLink from "./MultipLinkList";

interface ChildLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  childLinks?: ChildLink[];
}

interface SideBarLinkProps {
  label: string;
  childLinks: ChildLink[];
}

export default function SideBarLinksContainer({
  label,
  childLinks,
}: SideBarLinkProps) {
  const activeTab = usePathname();
  return (
    <div>
      <label className="px-3 text-[#8a94a6] mb-2 inline-block uppercase text-[11px] tracking-wider">
        {label}
      </label>
      {childLinks.map((childLink) =>
        childLink.href ? (
          <Link
            key={childLink.href}
            href={childLink.href}
            className={`flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
              activeTab.includes(childLink.href)
                ? "bg-blue-50 text-blue-600 border-l border-blue-600"
                : "text-gray-500"
            }`}
            data-active={childLink.href}
          >
            {childLink.icon}
            <span>{childLink.label}</span>
          </Link>
        ) : (
          <MultipListLink childLink={childLink} key={childLink.href} />
        )
      )}
    </div>
  );
}
