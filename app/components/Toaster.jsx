"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3500,
        style: {
          background: "rgb(22 27 48 / 0.92)",
          color: "rgb(235 238 248)",
          border: "1px solid rgb(38 44 72 / 0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          padding: "12px 14px",
          fontSize: "14px",
          boxShadow: "0 10px 40px rgb(0 0 0 / 0.4)",
        },
        success: {
          iconTheme: {
            primary: "rgb(34 211 238)",
            secondary: "rgb(8 11 22)",
          },
        },
        error: {
          iconTheme: {
            primary: "rgb(248 113 113)",
            secondary: "rgb(8 11 22)",
          },
        },
      }}
    />
  );
}
