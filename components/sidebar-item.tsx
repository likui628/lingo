"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
  iconSrc: string,
  label: string,
  href: string
}

export const SidebarItem = ({iconSrc, label, href}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32}/>
        {label}
      </Link>
    </Button>

  )
}