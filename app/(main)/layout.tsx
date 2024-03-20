import React from "react";
import {Sidebar} from "@/components/sidebar";
import {MobileHeader} from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
}
const MainLayout = ({children}: Props) => {
  return (
    <>
      <MobileHeader/>
      <Sidebar className="hidden lg:flex"/>
      <main className="lg:pl-[256px] h-full">
        {children}
      </main>
    </>
  );
}

export default MainLayout;
