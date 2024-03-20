import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {SidebarItem} from "@/components/sidebar-item";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader} from "lucide-react";

type Props = {
  className?: string;
}
export const Sidebar = ({className}: Props) => {
  return <div className={
    cn("flex flex-col h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 mx-auto px-4",
      className)
  }>
    <Link href="/learn">
      <div className="pt-8 pl-4 pb-7 flex items-center">
        <Image src="/lingo_text.svg" height={42} width={179} alt="logo"></Image>
      </div>
    </Link>
    <div className="flex flex-col gap-y-2 flex-1">
      <SidebarItem
        label="Learn"
        href="/learn"
        iconSrc="/learn.svg"
      />
      <SidebarItem
        label="Leaderboard"
        href="/leaderboard"
        iconSrc="/leaderboard.svg"
      />
      <SidebarItem
        label="quests"
        href="/quests"
        iconSrc="/quests.svg"
      />
      <SidebarItem
        label="shop"
        href="/shop"
        iconSrc="/shop.svg"
      />
    </div>
    <div className="p-4">
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/"/>
      </ClerkLoaded>
    </div>
  </div>
}