import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

type Props = {
  title: string
}

export const Header = ({title}: Props) => {
  return (
    <div
      className="bg-white sticky top-0 pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50 w-full">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400"/>
        </Button>

      </Link>
      <h1 className="font-bold text-xl">{title}</h1>
      <div/>
    </div>
  )
}