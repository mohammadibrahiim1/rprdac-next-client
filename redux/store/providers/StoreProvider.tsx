/* eslint-disable react-hooks/refs */
"use client";

import { useRef } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeInitialized = useRef(false);

  // Initialize store on mount
  if (!storeInitialized.current) {
    // You can add any initial store setup here
    storeInitialized.current = true;
  }

  return children;
}
