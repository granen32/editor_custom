"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

export default function CustomLink({
  href,
  children,
  className = "",
  prefetch = true,
  replace = false,
  scroll = true,
  shallow = false,
}: CustomLinkProps) {
  const [isValidLink, setIsValidLink] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    try {
      const url = new URL(href, baseUrl);
      const isInternalLink = url.origin === baseUrl;
      setIsValidLink(isInternalLink);
    } catch (e) {
      // 상대 경로인 경우 내부 링크로 간주
      setIsValidLink(true);
    }
  }, [href, baseUrl]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidLink) {
      e.preventDefault();
      window.location.href = baseUrl;
      return;
    }

    if (scroll) {
      window.scrollTo(0, 0);
    }
  };

  if (!isValidLink) {
    return (
      <span className={`cursor-pointer ${className}`} onClick={handleClick}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
