import "../app/globals.css";
import React from "react";
import {HeaderNav} from "@/components/HeaderNav";

export const metadata = {
  title: 'Trekanten Video App',
  description: 'Generated by Mima',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <HeaderNav></HeaderNav>
      {children}
      </body>
    </html>
  )
}
