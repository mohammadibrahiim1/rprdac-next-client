// /* eslint-disable react-hooks/refs */
// "use client";

// import { useRef } from "react";

// export default function providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeInitialized = useRef(false);

//   // Initialize store on mount
//   if (!storeInitialized.current) {
//     // You can add any initial store setup here
//     storeInitialized.current = true;
//   }

//   return children;
// }

"use client";
import { Provider } from "react-redux";
import { store } from "../store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
