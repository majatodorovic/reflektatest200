"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const GenerateBreadCrumbsServer = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  return (
    <div className="text-sm font-medium max-lg:hidden">
      <Link href="/">Početna</Link>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span> / </span>
          <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default GenerateBreadCrumbsServer;
