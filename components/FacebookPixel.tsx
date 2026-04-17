"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPixel, pageView, FB_PIXEL_ID } from "../lib/pixel";

export default function FacebookPixel() {
  const pathname = usePathname();

  // Initialize pixel once
  useEffect(() => {
    initPixel();
    pageView();
  }, []);

  // Track page views on route change
  useEffect(() => {
    pageView();
  }, [pathname]);

  return (
    // noscript fallback
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
