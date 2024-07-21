import { ReactNode } from "react";
import {Nav} from "@/components/Nav";
import { NavLink } from "@/components/Nav";
import Header from "../../components/Header"

// force next to not cashe any of the admin pages because admin pages you have good internet speed and you don't need to cashe because you need most of up to date data, admin pages are not accessed that often so cashing is not needed
export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Header/>
      <div className="min-w-full">{children}</div>
    </div>
  );
}